export interface IUserListGetAllPublicRequest {
  userId: string;
  sessionId: string;
  sort?: 'id' | '-id' | 'order' | '-order' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt' | 'members' | '-members' | 'bookmarks' | '-bookmarks';
  size?: number;
  offset?: number;
  filter?: {
    role?: string[];
    lists?: string[];
    tags?: string[];
  };
}
