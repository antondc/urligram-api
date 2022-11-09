import { ILinkStatistics } from '@domain/link/entities/LinkStatistics';
import { Tag } from '@domain/tag/entities/Tag';

export class Bookmark {
  id: number;
  title: string;
  vote: boolean;
  favicon: string;
  isPublic: boolean;
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
  notes: string;
  tags: Tag[];

  constructor(options) {
    this.id = options.id;
    this.title = options.title;
    this.vote = options.vote;
    this.isPublic = options.isPublic;
    this.createdAt = options.createdAt;
    this.updatedAt = options.updatedAt;
    this.userId = options.userId;
    this.linkId = options.linkId;
    this.statistics = options.statistics;
    this.bookmarksRelated = options.bookmarksRelated;
    this.notes = options.notes;
    this.tags = options.tags;
  }
}
