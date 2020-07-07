export class Link {
  id: number;
  title: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(userDTO?) {
    this.id = userDTO?.id;
    this.title = userDTO?.title;
    this.order = userDTO?.order;
    this.createdAt = userDTO?.createdAt;
    this.updatedAt = userDTO?.updatedAt;
  }
}
