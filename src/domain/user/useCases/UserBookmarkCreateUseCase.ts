import { URLWrapper } from '@antoniodcorrea/utils';
import { testStringIsValidUrl } from '@antoniodcorrea/utils';
import { ILinkUpsertOneUseCase } from '@domain/link/useCases/LinkUpsertOneUseCase';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserBookmarkCreateRequest } from '@domain/user/useCases/interfaces/IUserBookmarkCreateRequest';
import { IUserBookmarkCreateResponse } from '@domain/user/useCases/interfaces/IUserBookmarkCreateResponse';
import { RequestError } from '@shared/errors/RequestError';

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

    const stringIsValidUrl = testStringIsValidUrl(url);
    if (!stringIsValidUrl) throw new RequestError('Url is not valid', 409, { message: '409 Conflict' });

    const parsedUrl = new URLWrapper(url);
    const domain = parsedUrl.getDomain();
    const path = parsedUrl.getPathAndSearch();

    const bookmarkExist = await this.userRepo.userBookmarkGetOneByUserIdPathDomain({
      sessionId: session?.id,
      path,
      domain,
      userId: session?.id,
    });
    if (!!bookmarkExist) throw new RequestError('Bookmark already exists', 409, { message: '409 Conflict' });

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
