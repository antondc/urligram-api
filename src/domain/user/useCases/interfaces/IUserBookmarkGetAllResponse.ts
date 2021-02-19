import { Bookmark } from '@domain/bookmark/entities/Bookmark';

export type IUserBookmarkGetAllResponse = {
  meta: {
    totalItems: number;
    offset: number;
    size: number;
    sort: string;
  };
  bookmarks: Bookmark[];
};
