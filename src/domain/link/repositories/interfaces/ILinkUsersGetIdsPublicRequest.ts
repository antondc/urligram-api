export type ILinkUsersGetIdsPublicRequest = {
  linkId: number;
  userId: string;
  sort?: 'order' | '-order' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt';
  size?: number;
  offset?: number;
};
