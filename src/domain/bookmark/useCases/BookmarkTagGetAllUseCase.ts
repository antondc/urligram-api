import { IBookmarkRepo } from '@domain/bookmark/repositories/IBookmarkRepo';
import { RequestError } from '@shared/errors/RequestError';
import { IBookmarkTagGetAllRequest } from './interfaces/IBookmarkTagGetAllRequest';
import { IBookmarkTagGetAllResponse } from './interfaces/IBookmarkTagGetAllResponse';

export interface IBookmarkTagGetAllUseCase {
  execute: (bookmarkTagGetAllRequest: IBookmarkTagGetAllRequest) => Promise<IBookmarkTagGetAllResponse>;
}

export class BookmarkTagGetAllUseCase implements IBookmarkTagGetAllUseCase {
  private bookmarkRepo: IBookmarkRepo;

  constructor(bookmarkRepo: IBookmarkRepo) {
    this.bookmarkRepo = bookmarkRepo;
  }

  public async execute(bookmarkTagGetAllRequest: IBookmarkTagGetAllRequest): Promise<IBookmarkTagGetAllResponse> {
    const { bookmarkId, session } = bookmarkTagGetAllRequest;

    const bookmark = await this.bookmarkRepo.bookmarkGetOne({ bookmarkId });
    if (bookmark.isPrivate && session?.id !== bookmark.userId) throw new RequestError("Bookmark doesn't exist", 404, { message: '404 Not Found' });

    const tags = await this.bookmarkRepo.bookmarkTagGetAll({ bookmarkId });

    return tags;
  }
}

/* --- DOC ---
  Returns a collection of tags related to a bookmark
  (1) Exception: when bookmark is private and user is not owner
*/
