import { RequestError } from '@shared/errors/RequestError';
import { IUserRepo } from '../repositories/IUserRepo';
import { IUserBookmarkDeleteOneRequest } from './interfaces/IUserBookmarkDeleteOneRequest';
import { IUserBookmarkDeleteOneResponse } from './interfaces/IUserBookmarkDeleteOneResponse';

export interface IUserBookmarkDeleteOneUseCase {
  execute: (userBookmarkDeleteOneRequest: IUserBookmarkDeleteOneRequest) => Promise<IUserBookmarkDeleteOneResponse>;
}

export class UserBookmarkDeleteOneUseCase implements IUserBookmarkDeleteOneUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userBookmarkDeleteOneRequest: IUserBookmarkDeleteOneRequest): Promise<IUserBookmarkDeleteOneResponse> {
    const { bookmarkId } = userBookmarkDeleteOneRequest;
    const { session, ...userBookmarkDeleteOneRequestWithoutSession } = userBookmarkDeleteOneRequest;
    const result = await this.userRepo.userBookmarkGetOne({ bookmarkId, userId: session?.id });
    if (!result) throw new RequestError('Not found', 404);

    const response = await this.userRepo.userBookmarkDeleteOne({ ...userBookmarkDeleteOneRequestWithoutSession, userId: session?.id });

    return response;
  }
}
