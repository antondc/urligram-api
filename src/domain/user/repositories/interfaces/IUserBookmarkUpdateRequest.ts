type Tag = {
  tag: string;
};

export interface IUserBookmarkUpdateRequest {
  bookmarkId: number;
  order: number;
  title: string;
  userId: string;
  saved: boolean;
  isPrivate: boolean;
  domain: string;
  path: string;
  tags: Tag[];
}
