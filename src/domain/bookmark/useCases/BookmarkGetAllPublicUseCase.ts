import { IBookmarkRepo } from '@domain/bookmark/repositories/IBookmarkRepo';
import { IBookmarkGetAllPublicResponse } from './interfaces/IBookmarkGetAllPublicResponse';

export interface IBookmarkGetAllPublicUseCase {
  execute: () => Promise<IBookmarkGetAllPublicResponse>;
}

export class BookmarkGetAllPublicUseCase implements IBookmarkGetAllPublicUseCase {
  private bookmarkRepo: IBookmarkRepo;

  constructor(bookmarkRepo: IBookmarkRepo) {
    this.bookmarkRepo = bookmarkRepo;
  }

  public async execute(): Promise<IBookmarkGetAllPublicResponse> {
    const bookmarks = await this.bookmarkRepo.bookmarkGetAllPublic();

    const filteredBookmarks = bookmarks.filter((bookmark) => !bookmark.isPrivate); // (1)

    return filteredBookmarks;
  }
}
/* --- DOC ---
  Returns a collection of bookmark
  (1) Filter: when bookmark is not private
*/
