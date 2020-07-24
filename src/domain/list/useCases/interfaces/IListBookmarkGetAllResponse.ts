import { Bookmark } from '@domain/bookmarks/entities/Bookmark';

interface BookmarkWithUrl extends Bookmark {
  url: string;
}

export type IListBookmarkGetAllResponse = BookmarkWithUrl[];
