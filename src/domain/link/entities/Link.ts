import { Bookmark } from '@domain/bookmarks/entities/Bookmark';

export class Link {
  id: string;
  url: string;
  bookmarks: Bookmark[];

  constructor(options) {
    this.id = options.id;
    this.url = options.url;
    this.bookmarks = options.bookmarks;
  }
}
