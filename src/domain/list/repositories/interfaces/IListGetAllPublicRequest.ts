export type IListGetAllPublicRequest = {
  userId?: string;
  sort?: 'id' | '-id' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt' | 'members' | '-members';
  size?: number;
};
