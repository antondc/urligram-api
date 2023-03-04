import { addDefaultHttps, URLWrapper } from '@antoniodcorrea/utils';
import { testStringIsValidUrl } from '@antoniodcorrea/utils';
import { ILinkUpsertOneUseCase } from '@domain/link/useCases/LinkUpsertOneUseCase';
import { UserAccountType } from '@domain/user/entities/UserAccountType';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserBookmarkCreateRequest } from '@domain/user/useCases/interfaces/IUserBookmarkCreateRequest';
import { IUserBookmarkCreateResponse } from '@domain/user/useCases/interfaces/IUserBookmarkCreateResponse';
import { USER_BASIC_BOOKMARKS_PRIVATE_FREE_LIMIT, USER_BASIC_BOOKMARKS_PRIVATE_RATIO_LIMIT } from '@shared/constants/constants';
import { RequestError } from '@shared/errors/RequestError';
import { UserError } from '@shared/errors/UserError';

export interface IUserBookmarkCreateUseCase {
  execute: (bookmarkCreateRequest: IUserBookmarkCreateRequest) => Promise<IUserBookmarkCreateResponse>;
}

export class UserBookmarkCreateUseCase implements IUserBookmarkCreateUseCase {
  private userRepo: IUserRepo;
  private linkUpsertOneUseCase: ILinkUpsertOneUseCase;

  constructor(userRepo: IUserRepo, linkUpsertOneUseCase: ILinkUpsertOneUseCase) {
    this.userRepo = userRepo;
    this.linkUpsertOneUseCase = linkUpsertOneUseCase;
  }

  public async execute(bookmarkCreateRequest: IUserBookmarkCreateRequest): Promise<IUserBookmarkCreateResponse> {
    const { session, url, title, isPublic, tags, notes } = bookmarkCreateRequest;

    const { bookmarks: userBookmarks } = await this.userRepo.userBookmarkGetAll({
      userId: session.id,
      sessionId: session?.id,
    });
    const userBookmarksPrivate = userBookmarks.filter((item) => !item.isPublic);
    const userBookmarksPrivateRatio = Math.floor((userBookmarksPrivate.length / userBookmarks.length) * 100);
    if (
      !isPublic &&
      session.accountType !== UserAccountType.Advanced &&
      userBookmarks.length > USER_BASIC_BOOKMARKS_PRIVATE_FREE_LIMIT &&
      userBookmarksPrivateRatio > USER_BASIC_BOOKMARKS_PRIVATE_RATIO_LIMIT
    ) {
      throw new UserError('User reached limit of private bookmarks', 403, '403 Forbidden');
    } // (1)

    const urlWithDefaultProtocol = addDefaultHttps(url);
    const stringIsValidUrl = testStringIsValidUrl(urlWithDefaultProtocol);
    if (!stringIsValidUrl) throw new RequestError('Url is not valid', 409, { message: '409 Conflict' });
    // (2)

    const parsedUrl = new URLWrapper(url);
    const domain = parsedUrl.getDomain();
    const path = parsedUrl.getPathAndSearch();

    const bookmarkExist = await this.userRepo.userBookmarkGetOneByUserIdPathDomain({
      sessionId: session?.id,
      path,
      domain,
      userId: session?.id,
    });
    if (!!bookmarkExist) throw new RequestError('Bookmark already exists', 409, { message: '409 Conflict' }); // (3)

    const link = await this.linkUpsertOneUseCase.execute({ session, url, alternativeTitle: title });

    const result = await this.userRepo.userBookmarkCreate({
      userId: session?.id,
      linkId: link?.id,
      title,
      isPublic,
      tags,
      notes,
    });
    if (!result?.id) throw new RequestError('Bookmark creation failed', 500, { message: '500 Server Error' });

    const response = await this.userRepo.userBookmarkGetOneByBookmarkIdUserId({
      sessionId: session?.id,
      bookmarkId: result?.id,
      userId: session?.id,
    });

    return response;
  }
}

/* --- DOC ---
  Creates a new Bookmark for given User
  Exceptions:
    (1) Bookmark is private,
        user is not an advanced user, and
        has more than USER_BASIC_BOOKMARKS_PRIVATE_FREE_LIMIT
        ratio private/public is more than USER_BASIC_BOOKMARKS_PRIVATE_RATIO_LIMIT
    (2) URL is not valid
    (3) Bookmark already exists
    (4) Bookmark creation failed
*/
