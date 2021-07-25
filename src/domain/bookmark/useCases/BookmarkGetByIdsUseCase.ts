import { IBookmarkRepo } from '@domain/bookmark/repositories/IBookmarkRepo';
import { IBookmarkGetByIdsRequest } from './interfaces/IBookmarkGetByIdsRequest';
import { IBookmarkGetByIdsResponse } from './interfaces/IBookmarkGetByIdsResponse';

export interface IBookmarkGetByIdsUseCase {
  execute: (bookmarkGetByIdsRequest: IBookmarkGetByIdsRequest) => Promise<IBookmarkGetByIdsResponse>;
}

export class BookmarkGetByIdsUseCase implements IBookmarkGetByIdsUseCase {
  private bookmarkRepo: IBookmarkRepo;

  constructor(bookmarkRepo: IBookmarkRepo) {
    this.bookmarkRepo = bookmarkRepo;
  }

  public async execute(bookmarkGetByIdsRequest: IBookmarkGetByIdsRequest): Promise<IBookmarkGetByIdsResponse> {
    const { session, bookmarkIds } = bookmarkGetByIdsRequest;

    const bookmarksData = await this.bookmarkRepo.bookmarkGetByIds({ sessionId: session?.id, bookmarkIds });

    return bookmarksData;
  }
}
