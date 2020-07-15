import { User } from '@domain/user/entities/User';

type Tag = {
  tag: string;
};

type List = {
  id: number;
};

export interface IUserBookmarkCreateRequest {
  userId: string;
  title: string;
  saved: boolean;
  vote: boolean;
  isPrivate: boolean;
  url: string;
  tags?: Tag[];
  lists?: List[];
  session: User;
}
