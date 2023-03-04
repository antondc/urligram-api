import { Tag } from '@domain/tag/entities/Tag';
import { ListUserRole } from './ListUserRole';

export class List {
  id: number;
  name: string;
  isPublic: boolean;
  description: string;
  userId: string;
  image: string;
  bookmarksIds: number[];
  linksIds: number[];
  members: {
    id: string;
    role: ListUserRole;
  }[];
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;

  constructor(options) {
    this.id = options.id;
    this.name = options.name;
    this.isPublic = options.isPublic;
    this.description = options.description;
    this.userId = options.userId;
    this.image = options.image;
    this.bookmarksIds = options.bookmarksIds;
    this.members = options.members;
    this.tags = options.tags;
    this.createdAt = options.createdAt;
    this.updatedAt = options.updatedAt;
  }
}
