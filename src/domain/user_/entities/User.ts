export class User {
  id: string;
  name: string;
  level: string;
  email: string;
  status: string;
  password: number;
  statement: string;
  location: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(user?) {
    this.id = user?.id;
    this.name = user?.name;
    this.level = user?.level;
    this.email = user?.email;
    this.status = user?.status;
    this.statement = user?.statement;
    this.location = user?.location;
    this.password = user?.password;
    this.order = user?.order;
    this.createdAt = user?.createdAt;
    this.updatedAt = user?.updatedAt;
  }
}
