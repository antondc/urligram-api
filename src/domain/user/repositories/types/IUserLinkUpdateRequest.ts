type Tag = {
  tag: string;
};

type List = {
  id: number;
};

export interface IUserLinkUpdateRequest {
  id?: number;
  userId: string;
  order: number;
  saved: boolean;
  vote: boolean;
  isPrivate: boolean;
  url: string;
  tags: Tag[];
  lists?: List[];
}
