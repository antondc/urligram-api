type Tag = {
  tag: string;
};

export interface IUserBookmarkUpdateRequest {
  bookmarkId: number;
  order: number;
  title: string;
  isPublic: boolean;
  tags: Tag[];
  notes: string;
}
