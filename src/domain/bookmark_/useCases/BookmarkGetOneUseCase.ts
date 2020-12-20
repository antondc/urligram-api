import { IBookmarkRepo } from '@domain/bookmark/repositories/IBookmarkRepo';
// import { RequestError } from '@shared/errors/RequestError';
import { IBookmarkGetOneRequest } from './interfaces/IBookmarkGetOneRequest';
import { IBookmarkGetOneResponse } from './interfaces/IBookmarkGetOneResponse';

export interface IBookmarkGetOneUseCase {
  execute: (listBookmarkGetOneRequest: IBookmarkGetOneRequest) => Promise<IBookmarkGetOneResponse>;
}

export class BookmarkGetOneUseCase implements IBookmarkGetOneUseCase {
  private bookmarkRepo: IBookmarkRepo;

  constructor(bookmarkRepo: IBookmarkRepo) {
    this.bookmarkRepo = bookmarkRepo;
  }

  public async execute(listBookmarkGetOneRequest: IBookmarkGetOneRequest): Promise<IBookmarkGetOneResponse> {
    const { bookmarkId } = listBookmarkGetOneRequest;
    const bookmark = await this.bookmarkRepo.bookmarkGetOne({ bookmarkId });

    return bookmark;
  }
}

/* --- DOC ---
  Returns a bookmark within a list
  Exceptions:
    (1) The bookmark or the list are private, and the user is not in the list
*/
