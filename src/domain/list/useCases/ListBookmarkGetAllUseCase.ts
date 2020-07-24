import { IListRepo } from '@domain/list/repositories/IListRepo';
import { RequestError } from '@shared/errors/RequestError';
import { IListBookmarkGetAllRequest } from './interfaces/IListBookmarkGetAllRequest';
import { IListBookmarkGetAllResponse } from './interfaces/IListBookmarkGetAllResponse';

export interface IListBookmarkGetAllUseCase {
  execute: (listBookmarkGetAllRequest: IListBookmarkGetAllRequest) => Promise<IListBookmarkGetAllResponse>;
}

export class ListBookmarkGetAllUseCase implements IListBookmarkGetAllUseCase {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  public async execute(listBookmarkGetAllRequest: IListBookmarkGetAllRequest): Promise<IListBookmarkGetAllResponse> {
    const { listId, session } = listBookmarkGetAllRequest;

    const list = await this.listRepo.listGetOneById({ listId });
    if (!list) throw new RequestError('List not found', 404, { message: '404 Not Found' });

    const bookmarks = await this.listRepo.listBookmarkGetAll({ listId });
    const userInList = await this.listRepo.listUserGetOneByListId({ userId: session?.id, listId });

    if (!userInList && !!list.isPrivate) throw new RequestError('List not found', 404, { message: '404 Not Found' });

    return bookmarks;
  }
}

/* --- DOC ---
  Returns a bookmark within a list
  Exceptions
    (1) The bookmark or the list are private, and the user is not in the list
*/
