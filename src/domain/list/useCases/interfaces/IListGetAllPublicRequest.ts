import { User } from '@domain/user/entities/User';

export type IListGetAllPublicRequest = {
  session?: User;
  sort: string;
  size: number;
};
