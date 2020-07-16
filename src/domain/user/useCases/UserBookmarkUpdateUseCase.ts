import { URLWrapper } from '@infrastructure/services/UrlWrapper';
import { RequestError } from '@shared/errors/RequestError';
import { IUserRepo } from '../repositories/IUserRepo';
import { IUserBookmarkUpdateRequest } from './interfaces/IUserBookmarkUpdateRequest';
import { IUserBookmarkUpdateResponse } from './interfaces/IUserBookmarkUpdateResponse';

export interface IUserBookmarkUpdateUseCase {
  execute: (userBookmarkUpdateRequest: IUserBookmarkUpdateRequest) => Promise<IUserBookmarkUpdateResponse>;
}

export class UserBookmarkUpdateUseCase implements IUserBookmarkUpdateUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userBookmarkUpdateRequest: IUserBookmarkUpdateRequest): Promise<IUserBookmarkUpdateResponse> {
    const { url, bookmarkId } = userBookmarkUpdateRequest;
    const { session, ...userBookmarkUpdateRequestWithoutSession } = userBookmarkUpdateRequest;
    const parsedUrl = new URLWrapper(url);
    const domain = parsedUrl.getDomain();
    const path = parsedUrl.getPath() + parsedUrl.getSearch();

    const bookmarkExists = await this.userRepo.userBookmarkGetOne({ bookmarkId, userId: session?.id });
    if (!bookmarkExists) throw new RequestError('Bookmark not found', 404, { message: '404 Not Found' });

    const formattedUserBookmarkUpdateRequest = {
      ...userBookmarkUpdateRequestWithoutSession,
      domain,
      path,
      userId: session?.id,
    };
    const result = await this.userRepo.userBookmarkUpdate(formattedUserBookmarkUpdateRequest);

    const response = await this.userRepo.userBookmarkGetOne({ bookmarkId: Number(result.bookmarkId), userId: session?.id });

    return response;
  }
}
