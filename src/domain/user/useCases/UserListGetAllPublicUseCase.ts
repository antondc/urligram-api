import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { RequestError } from '@shared/errors/RequestError';
import { IUserListGetAllPublicRequest } from './interfaces/IUserListGetAllPublicRequest';
import { IUserListGetAllPublicResponse } from './interfaces/IUserListGetAllPublicResponse';

export interface IUserListGetAllPublicUseCase {
  execute: (userListGetAllPublicRequest: IUserListGetAllPublicRequest) => Promise<IUserListGetAllPublicResponse>;
}

export class UserListGetAllPublicUseCase implements IUserListGetAllPublicUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userListGetAllPublicRequest: IUserListGetAllPublicRequest): Promise<IUserListGetAllPublicResponse> {
    const { userId, session } = userListGetAllPublicRequest;

    const user = await this.userRepo.userGetOne({ userId });
    if (!user) throw new RequestError('User not found', 404, { message: '404 Not Found' });

    const lists = await this.userRepo.userListGetAllPublic({ userId, sessionId: session?.id });

    return lists;
  }
}

/* --- DOC ---
  Returns a collection of lists
  Exceptions:
    (1) There is no user
  Returns
    (2) List is public
    (3) List is private but user is within it
*/
