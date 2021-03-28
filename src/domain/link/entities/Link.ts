import { ILinkStatistics } from './LinkStatistics';

export class Link {
  id: number;
  url: string;
  title: string;
  img: string;
  favicon: string;
  description: string;
  language: string;
  bookmarks: {
    id: number;
    title: string;
    userId: string;
    isPrivate: boolean;
  }[];
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
