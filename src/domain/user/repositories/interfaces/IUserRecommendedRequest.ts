export interface IUserRecommendedRequest {
  userId: string;
  size: number;
  offset: number;
  sort: string;
}
