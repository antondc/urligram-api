type Tag = {
  tag: string;
};

export interface IUserBookmarkCreateRequest {
  userId: string;
  linkId: number;
  title: string;
  isPublic: boolean;
  tags?: Tag[];
  notes: string;
}
