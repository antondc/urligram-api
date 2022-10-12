import { User } from '@domain/user/entities/User';

type Tag = {
  tag: string;
};

export interface IUserBookmarkCreateRequest {
  title: string;
  saved: boolean;
  isPrivate: boolean;
  url: string;
  tags?: Tag[];
  session: User;
  notes: string;
}
