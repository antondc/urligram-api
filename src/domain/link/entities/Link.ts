import { Bookmark } from '@domain/bookmark/entities/Bookmark';
import { ILinkStatistics } from './LinkStatistics';

export class Link {
  id: number;
  url: string;
  title: string;
  img: string;
  bookmarks: Bookmark[];
  statistics: ILinkStatistics;

  constructor(options) {
    this.id = options.id;
    this.url = options.url;
    this.title = options.title;
    this.img = options.img;
    this.bookmarks = options.bookmarks;
    this.statistics = options.statistics;
  }
}
