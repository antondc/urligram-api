import { User } from '@domain/user/entities/User';

export class List {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isPrivate: boolean;
  users: User[];

  constructor(userDTO?) {
    this.id = userDTO?.id;
    this.name = userDTO?.name;
    this.description = userDTO?.description;
    this.createdAt = userDTO?.createdAt;
    this.isPrivate = userDTO?.isPrivate;
  }
}
