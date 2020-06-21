export class User {
  id: string;
  name: string;
  level: string;
  email: string;
  status: number;
  password: number;
  statement: string;
  location: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(userDTO?) {
    this.id = userDTO?.id;
    this.name = userDTO?.name;
    this.level = userDTO?.level;
    this.email = userDTO?.email;
    this.status = userDTO?.status;
    this.statement = userDTO?.statement;
    this.location = userDTO?.location;
    this.password = userDTO?.password;
    this.order = userDTO?.order;
    this.createdAt = userDTO?.createdAt;
    this.updatedAt = userDTO?.updatedAt;
  }
}
