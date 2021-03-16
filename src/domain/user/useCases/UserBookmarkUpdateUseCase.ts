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
    const { session, bookmarkId, order, title, isPrivate, tags } = userBookmarkUpdateRequest;

    const bookmarkExists = await this.userRepo.userBookmarkGetOneByBookmarkIdUserId({
      bookmarkId,
      userId: session?.id,
    });
    if (!bookmarkExists) throw new RequestError('Bookmark not found', 404, { message: '404 Not Found' });

    const result = await this.userRepo.userBookmarkUpdate({
      bookmarkId,
      order,
      title,
      isPrivate,
      tags,
    });

    const response = await this.userRepo.userBookmarkGetOneByBookmarkIdUserId({
      bookmarkId: result.bookmarkId,
      userId: session?.id,
    });

    return response;
  }
}
