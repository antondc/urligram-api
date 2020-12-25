import { Bookmark } from '@domain/bookmark/entities/Bookmark';

export class Link {
  id: number;
  url: string;
  bookmarks: Bookmark[];
  vote: number | null;

  constructor(options) {
    this.id = options.id;
    this.url = options.url;
    this.bookmarks = options.bookmarks;
    this.vote = options.vote;
  }
}
