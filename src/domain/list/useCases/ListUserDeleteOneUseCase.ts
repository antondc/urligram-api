import { IListRepo } from '@domain/list/repositories/IListRepo';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { RequestError } from '@shared/errors/RequestError';
import { IListUserDeleteOneRequest } from './interfaces/IListUserDeleteOneRequest';
import { IListUserDeleteOneResponse } from './interfaces/IListUserDeleteOneResponse';

export interface IListUserDeleteOneUseCase {
  execute: (listUserDeleteOneRequest: IListUserDeleteOneRequest) => Promise<IListUserDeleteOneResponse>;
}

export class ListUserDeleteOneUseCase implements IListUserDeleteOneUseCase {
  private listRepo: IListRepo;
  private userRepo: IUserRepo;

  constructor(listRepo: IListRepo, userRepo: IUserRepo) {
    this.listRepo = listRepo;
    this.userRepo = userRepo;
  }

  public async execute(listUserDeleteOneRequest: IListUserDeleteOneRequest): Promise<IListUserDeleteOneResponse> {
    const { listId, userId, session } = listUserDeleteOneRequest;

    const list = await this.listRepo.listGetOneById({ listId, sessionId: session?.id });
    if (!list) throw new RequestError('List not found', 404, { message: '404 Not Found' }); // (1)

    const user = await this.userRepo.userGetOne({ userId });
    if (!user) throw new RequestError('User not found', 404, { message: '404 Not Found' }); // (2)

    const listUser = await this.listRepo.listUserGetOneByListId({ listId, userId });
    if (!listUser) throw new RequestError('User is not in that list', 404, { message: '404 Not Found' }); // (3)

    if (listUser.userRole === 'admin') throw new RequestError('Admins can not be removed from lists', 409, { message: '409 Conflict' }); // (4)

    const listSessionUser = await this.listRepo.listUserGetOneByListId({ listId, userId: session?.id });
    if (userId === session?.id && listSessionUser?.userRole === 'admin')
      throw new RequestError('You can not remove yourself from your list', 409, { message: '409 Conflict' }); // (5)

    if (userId !== session?.id && (!listSessionUser || listSessionUser?.userRole !== 'admin'))
      throw new RequestError('You have no permission to edit this list', 403, { message: '403 Forbidden' }); // (6)

    const deletedUser = await this.listRepo.listUserDeleteOne({ listId, userId });

    return deletedUser;
  }
}

/* --- DOC ---
  Adds a user to a list as a reader
  Exceptions
    (1) Exception: when list doesn't exist
    (2) Exception: when user doesn't exist
    (3) Exception: when user is not in that list
    (4) Exception: when deleted user is admin of that list
    (5) Exception: when logged user is deleting itself from a list, and he is admin of that list
    (6) Exception: when logged user is not deleted user, and is not in that list or is not its admin

*/
