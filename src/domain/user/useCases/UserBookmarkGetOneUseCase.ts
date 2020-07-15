import { IUserBookmarkGetOneResponse } from '@domain/user/repositories/interfaces/IUserBookmarkGetOneResponse';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { RequestError } from '@shared/errors/RequestError';
import { IUserBookmarkGetOneRequest } from './interfaces/IUserBookmarkGetOneRequest';

export interface IUserBookmarkGetOneUseCase {
  execute: (userBookmarkGetOneDTO: IUserBookmarkGetOneRequest) => Promise<IUserBookmarkGetOneResponse>;
}

export class UserBookmarkGetOneUseCase implements IUserBookmarkGetOneUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userBookmarkGetOneRequest: IUserBookmarkGetOneRequest): Promise<IUserBookmarkGetOneResponse> {
    // Returns bookmark for logged user only
    const { bookmarkId, session } = userBookmarkGetOneRequest;

    const response = await this.userRepo.userBookmarkGetOne({ bookmarkId, userId: session?.id });

    if (!response) throw new RequestError('Bookmark not found', 404, { message: '404 Not Found' });

    return response;
  }
}
