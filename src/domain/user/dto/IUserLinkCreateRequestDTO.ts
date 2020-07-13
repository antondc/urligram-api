import { User } from '../entities/User';

type Tag = {
  tag: string;
};

type List = {
  id: number;
};

export interface IUserLinkCreateRequestDTO {
  id?: string;
  saved: boolean;
  vote: boolean;
  isPrivate: boolean;
  url: string;
  tags: Tag[];
  lists?: List[];
  session: User;
}
