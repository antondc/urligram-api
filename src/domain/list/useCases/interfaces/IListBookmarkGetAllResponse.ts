import { Bookmark } from '@domain/bookmark/entities/Bookmark';

interface BookmarkWithUrl extends Bookmark {
  url: string;
}

export type IListBookmarkGetAllResponse = BookmarkWithUrl[];
