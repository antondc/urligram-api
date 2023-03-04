import { ListUserRole } from '@domain/list/entitites/ListUserRole';
import { IListRepo } from '@domain/list/repositories/IListRepo';
import { RequestError } from '@shared/errors/RequestError';
import { IListDeleteOneRequest } from './interfaces/IListDeleteOneRequest';
import { IListDeleteOneResponse } from './interfaces/IListDeleteOneResponse';

export interface IListDeleteOneUseCase {
  execute: (listDeleteOneRequest: IListDeleteOneRequest) => Promise<IListDeleteOneResponse>;
}

export class ListDeleteOneUseCase implements IListDeleteOneUseCase {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  public async execute(listDeleteOneRequest: IListDeleteOneRequest): Promise<IListDeleteOneResponse> {
    const { session, listId } = listDeleteOneRequest;

    const list = await this.listRepo.listGetOneById({ listId, sessionId: session?.id });
    if (!list) throw new RequestError("List doesn't exists", 404, { message: '404 Not Found' });

    const listUser = await this.listRepo.listUserGetOneByListId({ listId, userId: session?.id }); // (1)
    if (!listUser || listUser?.userRole !== ListUserRole.Admin) throw new RequestError('You can not administrate this list', 403, { message: '403 Forbidden' });

    const deletedList = await this.listRepo.listDeleteOne({ listId });

    return deletedList;
  }
}

/* --- DOC ---
  Deletes a list
    (1) Exception: when list doesn't exist
    (2) Exception: when user is not in that list, or is not user of that list
*/
