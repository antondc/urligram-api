export interface IUserFollowingGetAllRequest {
  sessionId: string;
  userId: string;
  sort?: 'order' | '-order' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt';
  size: number;
  offset: number;
}
