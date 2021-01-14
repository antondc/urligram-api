type Tag = {
  tag: string;
};

export interface IUserBookmarkCreateRequest {
  userId: string;
  title: string;
  saved: boolean;
  isPrivate: boolean;
  domain: string;
  path: string;
  tags?: Tag[];
}
