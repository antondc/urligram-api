export class Tag {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(userDTO?) {
    this.id = userDTO?.id;
    this.name = userDTO?.name;
    this.createdAt = userDTO?.createdAt;
    this.updatedAt = userDTO?.updatedAt;
  }
}
