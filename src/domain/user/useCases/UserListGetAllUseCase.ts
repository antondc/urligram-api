import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { RequestError } from '@shared/errors/RequestError';
import { IUserListGetAllRequest } from './interfaces/IUserListGetAllRequest';
import { IUserListGetAllResponse } from './interfaces/IUserListGetAllResponse';

export interface IUserListGetAllUseCase {
  execute: (userListGetAllRequest: IUserListGetAllRequest) => Promise<IUserListGetAllResponse>;
}

export class UserListGetAllUseCase implements IUserListGetAllUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userListGetAllRequest: IUserListGetAllRequest): Promise<IUserListGetAllResponse> {
    const { userId, session } = userListGetAllRequest;

    const user = await this.userRepo.userGetOne({ userId });
    if (!user) throw new RequestError('User not found', 404, { message: '404 Not Found' });

    const lists = await this.userRepo.userListGetAll({ userId, sessionId: session?.id });

    return lists;
  }
}

/* --- DOC ---
  Returns a collection of lists, except when
    (1) There is no user
  A list qualify for the collection if (MySQL)
    (2) Is public
    (3) Is private but user is within it
*/
