import { IListRepo } from '@domain/list/repositories/IListRepo';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { RequestError } from '@shared/errors/RequestError';
import { IListUserCreateOneRequest } from './interfaces/IListUserCreateOneRequest';
import { IListUserCreateOneResponse } from './interfaces/IListUserCreateOneResponse';

export interface IListUserCreateOneUseCase {
  execute: (listUserCreateOneRequest: IListUserCreateOneRequest) => Promise<IListUserCreateOneResponse>;
}

export class ListUserCreateOneUseCase implements IListUserCreateOneUseCase {
  private listRepo: IListRepo;
  private userRepo: IUserRepo;

  constructor(listRepo: IListRepo, userRepo: IUserRepo) {
    this.listRepo = listRepo;
    this.userRepo = userRepo;
  }

  public async execute(listUserCreateOneRequest: IListUserCreateOneRequest): Promise<IListUserCreateOneResponse> {
    const { listId, userId, session, userRole } = listUserCreateOneRequest;

    const list = await this.listRepo.listGetOneById({ listId, sessionId: session?.id });
    if (!list) throw new RequestError('List not found', 404, { message: '404 Not Found' }); // (1)
    const user = await this.userRepo.userGetOne({ userId });
    if (!user) throw new RequestError('User not found', 404, { message: '404 Not Found' }); // (1)

    const listUser = await this.listRepo.listUserGetOneByListId({ listId, userId });
    if (!!listUser) throw new RequestError('User is already in that list', 409, { message: '409 Conflict' }); // (3)

    const listSessionUser = await this.listRepo.listUserGetOneByListId({ listId, userId: session?.id });
    if (!list.isPublic && !listSessionUser) throw new RequestError('This list is private', 403, { message: '403 Forbidden' });
    if (!list.isPublic && listSessionUser.userRole !== 'admin')
      throw new RequestError('You have no permission to edit this list', 403, { message: '403 Forbidden' });

    if (!!list.isPublic) await this.listRepo.listUserCreateOne({ listId, userId, userListStatus: 'pending', userRole });

    if (!list.isPublic && userId !== session?.id && listSessionUser.userRole === 'admin')
      await this.listRepo.listUserCreateOne({ listId, userId, userListStatus: 'pending', userRole });

    const listUserCreated = await this.listRepo.listUserGetOneByListId({ listId, userId: userId });

    return listUserCreated;
  }
}

/* --- DOC ---
  Adds a user to a list as a reader
  Exceptions
    (1) List doesn't exist
    (2) User doesn't exist
    (3) User is already in that list
  Rules
    (4) If list is not private, add user with status active
    (5) If list is private, logged user is owner of the list, and userId is not the logged user, user is added with status «pending»; userId will have to approve it with useCase ListUserApprove
*/
