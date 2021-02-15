import { Bookmark } from '@domain/bookmark/entities/Bookmark';

interface BookmarkWithUrl extends Bookmark {
  url: string;
}

export type IBookmarkGetAllPublicResponse = {
  meta: {
    totalItems: number;
    offset: number;
    size: number;
    sort: string;
  };
  bookmarks: BookmarkWithUrl[];
};
