type Tag = {
  tag: string;
};

type List = {
  id: number;
};

export interface IUserBookmarkUpdateRequest {
  bookmarkId: number;
  order: number;
  saved: boolean;
  isPrivate: boolean;
  domain: string;
  path: string;
  tags: Tag[];
  lists?: List[];
  userId: string;
}
