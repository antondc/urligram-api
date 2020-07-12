export class Link {
  id: number;
  userId: string;
  title: string;
  order: number;
  url: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(linkDTO?) {
    this.id = linkDTO?.id;
    this.userId = linkDTO?.userId;
    this.title = linkDTO?.title;
    this.order = linkDTO?.order;
    this.url = linkDTO?.url;
    this.isPublic = linkDTO?.isPublict;
    this.createdAt = linkDTO?.createdAt;
    this.updatedAt = linkDTO?.updatedAt;
  }
}
