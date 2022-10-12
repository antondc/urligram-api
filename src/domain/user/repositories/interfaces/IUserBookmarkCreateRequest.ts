type Tag = {
  tag: string;
};

export interface IUserBookmarkCreateRequest {
  userId: string;
  linkId: number;
  title: string;
  isPrivate: boolean;
  tags?: Tag[];
  notes: string;
}
