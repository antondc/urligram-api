export class Bookmark {
  id: string;
  title: string;
  vote: boolean;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(options) {
    this.id = options.id;
    this.title = options.title;
    this.vote = options.vote;
    this.isPrivate = options.isPrivate;
    this.createdAt = options.createdAt;
    this.updatedAt = options.updatedAt;
  }
}
