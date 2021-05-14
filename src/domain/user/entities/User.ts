import { FileImage } from '@domain/file/entities/FileImage';
import { IFileImageFormatOptions } from '@domain/file/entities/interfaces/IFileImageFormatOptions';

export const userImageFormat: IFileImageFormatOptions = {
  extension: 'png',
  sizes: [
    {
      height: 50,
      width: 200,
    },
    {
      height: 500,
      width: 500,
    },
  ],
  crop: 'center',
  destinationFolder: 'users/image',
};

export class User {
  id: string;
  name: string;
  level: string;
  email: string;
  image: { [key: string]: string };
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

  constructor(user) {
    const image = new FileImage();
    const imageFormatted = image.getFormattedImageUrls({
      sizes: userImageFormat?.sizes,
      imageUrl: user?.image,
    });
    this.id = user?.id;
    this.name = user?.name;
    this.level = user?.level;
    this.email = user?.email;
    this.image = imageFormatted;
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
