import { Tag } from '@domain/tag/entities/Tag';

export class List {
  id: number;
  name: string;
  isPrivate: boolean;
  description: string;
  userId: string;
  image: string;
  bookmarksIds: number[];
  members: {
    id: string;
    userRole?: 'reader' | 'editor' | 'admin';
  }[];
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;

  constructor(options) {
    this.id = options.id;
    this.name = options.name;
    this.isPrivate = options.isPrivate;
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
