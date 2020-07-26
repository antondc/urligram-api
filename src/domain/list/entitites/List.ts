import { User } from '@domain/user/entities/User';

export class List {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isPrivate: boolean;
  users: User[];

  constructor(user?) {
    this.id = user?.id;
    this.name = user?.name;
    this.description = user?.description;
    this.createdAt = user?.createdAt;
    this.isPrivate = user?.isPrivate;
  }
}
