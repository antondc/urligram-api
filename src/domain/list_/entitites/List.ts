import { User } from '@domain/user/entities/User';

export class List {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isPrivate: boolean;
  users: User[];

  constructor(options) {
    this.id = options.id;
    this.name = options.name;
    this.description = options.description;
    this.createdAt = options.createdAt;
    this.isPrivate = options.isPrivate;
  }
}
