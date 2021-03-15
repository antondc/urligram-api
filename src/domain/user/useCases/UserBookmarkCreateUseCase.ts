import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserBookmarkCreateRequest } from '@domain/user/useCases/interfaces/IUserBookmarkCreateRequest';
import { IUserBookmarkCreateResponse } from '@domain/user/useCases/interfaces/IUserBookmarkCreateResponse';
import { RequestError } from '@shared/errors/RequestError';
import HttpClient from '@shared/services/HttpClient';
import { URLWrapper } from '@shared/services/UrlWrapper';
import { testStringIsValidUrl } from '@tools/helpers/url/testStringIsValidUrl';

export interface IUserBookmarkCreateUseCase {
  execute: (bookmarkCreateRequest: IUserBookmarkCreateRequest) => Promise<IUserBookmarkCreateResponse>;
}

export class UserBookmarkCreateUseCase implements IUserBookmarkCreateUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(bookmarkCreateRequest: IUserBookmarkCreateRequest): Promise<IUserBookmarkCreateResponse> {
    const { url, session, title, saved, isPrivate, tags } = bookmarkCreateRequest;

    const stringIsValidUrl = testStringIsValidUrl(url);
    if (!stringIsValidUrl) throw new RequestError('Url is not valid', 409, { message: '409 Conflict' });

    const parsedUrl = new URLWrapper(url);
    const domain = parsedUrl.getDomain();
    const path = parsedUrl.getPathAndSearch();

    try {
      await HttpClient.get(url);
    } catch {
      throw new RequestError('Url not found', 404);
    }

    const bookmarkExist = await this.userRepo.userBookmarkGetOneByUserIdPathDomain({
      path,
      domain,
      userId: session?.id,
    });
    if (!!bookmarkExist) throw new RequestError('Bookmark already exists', 409, { message: '409 Conflict' }); // (1)

    const result = await this.userRepo.userBookmarkCreate({
      userId: session.id,
      saved,
      isPrivate,
      tags,
      path,
      domain,
      title: title ? title : domain + path,
    });

    const response = await this.userRepo.userBookmarkGetOneByBookmarkIdUserId({
      bookmarkId: result.bookmarkId,
      userId: session?.id,
    });

    return response;
  }
}

/* --- DOC ---
  Creates a a bookmark
  Exeptions
    (1) Bookmark don't exist for this user
*/
