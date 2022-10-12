type Tag = {
  tag: string;
};

export interface IUserBookmarkUpdateRequest {
  bookmarkId: number;
  order: number;
  title: string;
  isPrivate: boolean;
  tags: Tag[];
  notes: string;
}
