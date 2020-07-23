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
    const { userId, session } = userBookmarkGetAllRequestDTO;

    const response = await this.userRepo.userBookmarkGetAll({ userId });
    const filteredResponse = response.filter((item) => session?.id === userId || !item.isPrivate); // (1)(2)

    return filteredResponse;
  }
}

/* --- DOC ---
  Deletes a bookmark when:
    (1) Bookmark is public
    (2) Bookmark is owned by user
*/
