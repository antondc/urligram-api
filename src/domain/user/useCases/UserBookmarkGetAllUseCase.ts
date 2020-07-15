import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserBookmarkGetAllRequest } from './interfaces/IUserBookmarkGetAllRequest';
import { IUserBookmarkGetAllResponse } from './interfaces/IUserBookmarkGetAllResponse';

export interface IUserBookmarkGetAllUseCase {
  execute: (userBookmarkGetAllRequestDTO: IUserBookmarkGetAllRequest) => Promise<IUserBookmarkGetAllResponse>;
}

export class UserBookmarkGetAllUseCase implements IUserBookmarkGetAllUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userBookmarkGetAllRequestDTO: IUserBookmarkGetAllRequest): Promise<IUserBookmarkGetAllResponse> {
    // Returns relation of user <=> link
    // (1) If userId is sessionId, then return all; otherwise return only public links

    const { userId, session } = userBookmarkGetAllRequestDTO;

    const response = await this.userRepo.userBookmarkGetAll({ userId });

    const filteredResponse = response.filter((item) => session?.id === userId || !item.isPrivate); // (1)

    return filteredResponse;
  }
}
