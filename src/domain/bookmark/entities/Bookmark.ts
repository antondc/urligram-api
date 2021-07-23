import { ILinkStatistics } from '@domain/link/entities/LinkStatistics';

export class Bookmark {
  id: number;
  title: string;
  vote: boolean;
  favicon: string;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  linkId: number;
  statistics: ILinkStatistics;
  link: {
    id: number;
    title: string;
  };
  bookmarksRelated: {
    id: number;
    title: string;
    userId: string;
  }[];
  viewPending?: boolean;

  constructor(options) {
    this.id = options.id;
    this.title = options.title;
    this.vote = options.vote;
    this.isPrivate = options.isPrivate;
    this.createdAt = options.createdAt;
    this.updatedAt = options.updatedAt;
    this.userId = options.userId;
    this.linkId = options.linkId;
    this.statistics = options.statistics;
    this.bookmarksRelated = options.bookmarksRelated;
    this.viewPending = options.viewPending;
  }
}
