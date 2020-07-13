type Tag = {
  tag: string;
};

type List = {
  id: number;
};

export interface IUserLinkCreateRequest {
  id?: string;
  userId: string;
  saved: boolean;
  vote: boolean;
  isPrivate: boolean;
  url: string;
  tags: Tag[];
  lists?: List[];
}
