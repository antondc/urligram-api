export class User {
  id: string;
  name: string;
  level: string;
  email: string;
  image: string;
  status: string;
  password: number;
  statement: string;
  location: string;
  bookmarksIds: number[];
  followersIds: number[];
  followingIds: number[];
  order: number;
  activationToken?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(user?) {
    this.id = user?.id;
    this.name = user?.name;
    this.level = user?.level;
    this.email = user?.email;
    this.image = user?.image;
    this.status = user?.status;
    this.statement = user?.statement;
    this.location = user?.location;
    this.bookmarksIds = user?.bookmarksIds;
    this.followersIds = user?.followersIds;
    this.followingIds = user?.followingIds;
    this.password = user?.password;
    this.activationToken = user?.activationToken;
    this.order = user?.order;
    this.createdAt = user?.createdAt;
    this.updatedAt = user?.updatedAt;
  }
}
