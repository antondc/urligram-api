export class Bookmark {
  id: number;
  title: string;
  image: string;
  vote: boolean;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  linkId: number;

  constructor(options) {
    this.id = options.id;
    this.title = options.title;
    this.vote = options.vote;
    this.isPrivate = options.isPrivate;
    this.createdAt = options.createdAt;
    this.updatedAt = options.updatedAt;
    this.userId = options.userId;
    this.linkId = options.linkId;
  }
}
