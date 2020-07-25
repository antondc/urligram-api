import { IListRepo } from '@domain/list/repositories/IListRepo';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { RequestError } from '@shared/errors/RequestError';
import { IListUserUpdateOneRequest } from './interfaces/IListUserUpdateOneRequest';
import { IListUserUpdateOneResponse } from './interfaces/IListUserUpdateOneResponse';

export interface IListUserUpdateOneUseCase {
  execute: (listUserUpdateOneRequest: IListUserUpdateOneRequest) => Promise<IListUserUpdateOneResponse>;
}

export class ListUserUpdateOneUseCase implements IListUserUpdateOneUseCase {
  private listRepo: IListRepo;
  private userRepo: IUserRepo;

  constructor(listRepo: IListRepo, userRepo: IUserRepo) {
    this.listRepo = listRepo;
    this.userRepo = userRepo;
  }

  public async execute(listUserUpdateOneRequest: IListUserUpdateOneRequest): Promise<IListUserUpdateOneResponse> {
    const { listId, userId, userRole, session } = listUserUpdateOneRequest;

    const list = await this.listRepo.listGetOneById({ listId });
    if (!list) throw new RequestError('List not found', 404, { message: '404 Not Found' }); // (1)
    const user = await this.userRepo.userGetOne({ userId });
    if (!user) throw new RequestError('User not found', 404, { message: '404 Not Found' }); // (2)

    const listUser = await this.listRepo.listUserGetOneByListId({ listId, userId });
    if (!listUser) throw new RequestError('User is not in that list', 404, { message: '404 Not Found' }); // (3)

    if (userId === session?.id && listUser.userListStatus === 'pending') {
      await this.listRepo.listUserUpdateOne({ listId, userId, userListStatus: 'active', userRole: listUser.userRole });

      const updatedListUser = await this.listRepo.listUserGetOneByListId({ listId, userId });

      return updatedListUser;
    } // (4)

    const listSessionUser = await this.listRepo.listUserGetOneByListId({ listId, userId: session?.id });
    if (!listSessionUser || listSessionUser?.userRole !== 'admin')
      throw new RequestError('You have no permission to edit this list', 403, { message: '403 Forbidden' }); // (5)
    if (listUser.userListStatus === 'pending') throw new RequestError("The user didn't accept the invitation yet", 403, { message: '403 Forbidden' }); // (6)
    if (listSessionUser.id !== userId && String(userRole) === 'admin')
      throw new RequestError('Only you can be the admin of that list', 409, { message: '409 Conflict' }); // (7)

    if (listUser.userListStatus === 'active' && listSessionUser.userRole === 'admin')
      await this.listRepo.listUserUpdateOne({ listId, userId, userListStatus: 'active', userRole }); // (8)

    const updatedListUser = await this.listRepo.listUserGetOneByListId({ listId, userId: userId });

    return updatedListUser;
  }
}

/* --- DOC ---
  Adds a user to a list as a reader
  Exceptions
    (1) Exception: when list doesn't exist
    (2) Exception: when user doesn't exist
    (3) Exception: when user is not in that list
    (4) Accepted: when logged user is updating its relationship with a list —userId === session.id—, and its previous status was "pending", then update the relationship to status="active" with same role
    (5) Exception: when logged user is not in that list, or is not its admin
    (6) Exception: when updated user is in pending status
    (7) Exception: when updated user is in pending status
    (8) Accepted: when updated user is active in that list, and logged user is admin of that list

*/
