export interface IUserListGetAllPublicRequest {
  userId: string;
  sessionId: string;
  sort?: 'id' | '-id' | 'order' | '-order' | 'bookmarks' | '-bookmarks' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt';
  size?: number;
  offset?: number;
}
