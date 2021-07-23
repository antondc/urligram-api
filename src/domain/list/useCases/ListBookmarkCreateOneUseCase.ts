import { IBookmarkRepo } from '@domain/bookmark/repositories/IBookmarkRepo';
import { IListRepo } from '@domain/list/repositories/IListRepo';
import { RequestError } from '@shared/errors/RequestError';
import { IListBookmarkCreateOneRequest } from './interfaces/IListBookmarkCreateOneRequest';
import { IListBookmarkCreateOneResponse } from './interfaces/IListBookmarkCreateOneResponse';

export interface IListBookmarkCreateOneUseCase {
  execute: (listBookmarkCreateOneRequest: IListBookmarkCreateOneRequest) => Promise<IListBookmarkCreateOneResponse>;
}

export class ListBookmarkCreateOneUseCase implements IListBookmarkCreateOneUseCase {
  private listRepo: IListRepo;
  private bookmarkRepo: IBookmarkRepo;

  constructor(listRepo: IListRepo, bookmarkRepo: IBookmarkRepo) {
    this.listRepo = listRepo;
    this.bookmarkRepo = bookmarkRepo;
  }

  public async execute(listBookmarkCreateOneRequest: IListBookmarkCreateOneRequest): Promise<IListBookmarkCreateOneResponse> {
    const { session, listId, bookmarkId } = listBookmarkCreateOneRequest;

    const list = await this.listRepo.listGetOneById({ listId, sessionId: session?.id });
    if (!list) throw new RequestError('List does not exist', 404, { message: '404 Not Found' }); // (1)

    const bookmark = await this.bookmarkRepo.bookmarkGetOne({ bookmarkId, sessionId: session?.id });
    if (!bookmark) throw new RequestError('Bookmark does not exist', 404, { message: '404 Not Found' }); // (2)

    const listUser = await this.listRepo.listUserGetOneByListId({ userId: session?.id, listId });
    if (!listUser || listUser?.userRole === 'reader') throw new RequestError('You can not edit this list', 403, { message: '403 Forbidden' }); // (3)

    const listBookmark = await this.listRepo.listBookmarkGetOne({ sessionId: session?.id, listId, bookmarkId });
    if (!!listBookmark) throw new RequestError('List bookmark already exists', 409, { message: '409 Conflict' }); // (4)

    const createdBookmarkInList = await this.listRepo.listBookmarkCreateOne({ listId, bookmarkId });

    // (5)
    const membersIds = list?.members?.map((item) => item.id);
    const usersToNotify = [...(membersIds || []), list?.userId].filter((item) => item !== session?.id);
    const listMembersPromises = usersToNotify?.map(async (item) => {
      await this.listRepo.listBookmarkUserUpsertOne({ listId, bookmarkId, userId: item, viewPending: true });
    });
    await Promise.all(listMembersPromises);

    const result = await this.listRepo.listBookmarkGetOne({ sessionId: session?.id, listId, bookmarkId: createdBookmarkInList.bookmarkId });

    return result;
  }
}
/* --- DOC ---
  Creates a bookmark within a list
  Exceptions:
  (1) List doesn't exists
  (2) Bookmark doesn't exists
  (3) User is not in that list, or is in that list as a reader
  (4) The bookmark is already in that list
  Comments
  (5) Add listUserBookmark table entry to track that user has new items for this list
*/
