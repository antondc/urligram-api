import { IBookmarkRepo } from '@domain/bookmark/repositories/IBookmarkRepo';
import { RequestError } from '@shared/errors/RequestError';
import { IBookmarkListGetAllRequest } from './interfaces/IBookmarkListGetAllRequest';
import { IBookmarkListGetAllResponse } from './interfaces/IBookmarkListGetAllResponse';

export interface IBookmarkListGetAllUseCase {
  execute: (bookmarkListGetAllRequest: IBookmarkListGetAllRequest) => Promise<IBookmarkListGetAllResponse>;
}

export class BookmarkListGetAllUseCase implements IBookmarkListGetAllUseCase {
  private bookmarkRepo: IBookmarkRepo;

  constructor(bookmarkRepo: IBookmarkRepo) {
    this.bookmarkRepo = bookmarkRepo;
  }

  public async execute(bookmarkListGetAllRequest: IBookmarkListGetAllRequest): Promise<IBookmarkListGetAllResponse> {
    const { bookmarkId, session } = bookmarkListGetAllRequest;

    const bookmark = await this.bookmarkRepo.bookmarkGetOne({ bookmarkId });
    if (bookmark.isPrivate && session?.id !== bookmark.userId) throw new RequestError('Bookmark is private', 403, { message: '403 Forbidden' }); // (1)

    const bookmarkLists = await this.bookmarkRepo.bookmarkListGetAll({ bookmarkId });

    const filteredBookmarkLists = bookmarkLists.filter((bookmarkList) => {
      return !bookmarkList.isPrivate || bookmarkList.members.some((item) => item?.id === session.id);
    }); // (2)

    return filteredBookmarkLists;
  }
}

/* --- DOC ---
  Returns a collection of lists related to a bookmark
  (1) Exception: when bookmark is private and user is not its owner
  (2) Filter: when list is private and user is not within that list
*/
