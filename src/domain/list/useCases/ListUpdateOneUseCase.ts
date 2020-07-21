import { IListRepo } from '@domain/list/repositories/IListRepo';
import { RequestError } from '@shared/errors/RequestError';
import { IListUpdateOneRequest } from './interfaces/IListUpdateOneRequest';
import { IListUpdateOneResponse } from './interfaces/IListUpdateOneResponse';

export interface IListUpdateOneUseCase {
  execute: (listUpdateOneRequest: IListUpdateOneRequest) => Promise<IListUpdateOneResponse>;
}

export class ListUpdateOneUseCase implements IListUpdateOneUseCase {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  public async execute(listUpdateOneRequest: IListUpdateOneRequest): Promise<IListUpdateOneResponse> {
    const { session, listId, name, description, isPrivate } = listUpdateOneRequest;

    const originalList = await this.listRepo.listGetOneById({ listId });
    if (!originalList) throw new RequestError('List does not exist', 404, { message: '404 Not Found' });

    const listUser = await this.listRepo.listUserGetOneByListId({
      listId,
      userId: session?.id,
    });
    if (!listUser || listUser?.userRole === 'reader') throw new RequestError('You are not allowed to edit this list', 403, { message: '403 Forbidden' });

    const result = await this.listRepo.listUpdateOne({ listId, userId: session?.id, name, description, isPrivate });

    const updatedList = await this.listRepo.listGetOneById({ listId: result.listId });

    return updatedList;
  }
}

/* --- DOC ---
  Updates a list, when
  (1) List exists
  (2) The user is in that list
  (3) The user is not a reader of this list
*/
