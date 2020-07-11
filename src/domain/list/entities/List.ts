export class List {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  listType: string;

  constructor(userDTO?) {
    this.id = userDTO?.id;
    this.name = userDTO?.name;
    this.description = userDTO?.description;
    this.isPublic = userDTO?.isPublic;
    this.createdAt = userDTO?.createdAt;
    this.listType = userDTO?.listType;
  }
}
