import { FileImage } from '@domain/file/entities/FileImage';
import { IFileImageFormatOptions } from '@domain/file/entities/interfaces/IFileImageFormatOptions';
import { ListUserRole } from '@domain/list/entitites/ListUserRole';
import { UserAccountType } from './UserAccountType';
import { UserLevel } from './UserLevel';
import { UserStatus } from './UserStatus';

export const userImageFormat: IFileImageFormatOptions = {
  extension: 'png',
  sizes: [
    {
      height: 200,
      width: 200,
    },
    {
      height: 600,
      width: 600,
    },
    {
      height: 1200,
      width: 1200,
    },
  ],
  crop: 'center',
  destinationFolder: 'users/image',
};

export class User {
  id: string;
  order: string;
  name: string;
  accountType: UserAccountType;
  level: UserLevel;
  status: UserStatus;
  email: string;
  image: { [key: string]: string };
  password: string;
  statement: string;
  location: string;
  bookmarksIds: number[];
  followers: number[];
  following: number[];
  lists: {
    id: number;
    userRole: ListUserRole;
  }[];
  tags: {
    id: number;
    name: string;
    count: number;
  }[];
  activationToken?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(user) {
    const image = new FileImage();
    const imageFormatted = image.getFormattedImageUrls({
      sizes: userImageFormat?.sizes,
      imageUrl: user?.image,
    });
    this.id = user?.id;
    this.order = user?.order;
    this.name = user?.name;
    this.level = user?.level;
    this.accountType = user?.accountType;
    this.email = user?.email;
    this.image = imageFormatted;
    this.status = user?.status;
    this.statement = user?.statement;
    this.location = user?.location;
    this.bookmarksIds = user?.bookmarksIds;
    this.followers = user?.followers;
    this.following = user?.following;
    this.lists = user?.lists;
    this.password = user?.password;
    this.activationToken = user?.activationToken;
    this.createdAt = user?.createdAt;
    this.updatedAt = user?.updatedAt;
    this.tags = user?.tags;
  }
}
