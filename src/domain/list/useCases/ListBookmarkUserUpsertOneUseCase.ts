import { IListRepo } from '@domain/list/repositories/IListRepo';
import { RequestError } from '@shared/errors/RequestError';
import { IListBookmarkUserUpsertOneRequest } from './interfaces/IListBookmarkUserUpsertOneRequest';
import { IListBookmarkUserUpsertOneResponse } from './interfaces/IListBookmarkUserUpsertOneResponse';

export interface IListBookmarkUserUpsertOneUseCase {
  execute: (listBookmarkUserUpsertOneRequest: IListBookmarkUserUpsertOneRequest) => Promise<IListBookmarkUserUpsertOneResponse>;
}

export class ListBookmarkUserUpsertOneUseCase implements IListBookmarkUserUpsertOneUseCase {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  public async execute(listBookmarkUserUpsertOneRequest: IListBookmarkUserUpsertOneRequest): Promise<IListBookmarkUserUpsertOneResponse> {
    const { session, listId, bookmarkId, viewPending } = listBookmarkUserUpsertOneRequest;

    const list = await this.listRepo.listGetOneById({ listId, sessionId: session?.id });
    if (!list) throw new RequestError('List not found', 404, { message: '404 Not Found' });

    const bookmark = await this.listRepo.listBookmarkGetOne({ sessionId: session?.id, listId, bookmarkId });
    if (!bookmark) throw new RequestError('Bookmark not found', 404, { message: '404 Not Found' });

    const userInList = await this.listRepo.listUserGetOneByListId({ userId: session?.id, listId });
    if (!userInList && (!list.isPublic || !bookmark.isPublic)) throw new RequestError('Bookmark not found', 404, { message: '404 Not Found' });

    const listBookmarkUserUpdated = await this.listRepo.listBookmarkUserUpsertOne({ listId, bookmarkId, userId: session?.id, viewPending });

    return listBookmarkUserUpdated;
  }
}
