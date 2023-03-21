import { User } from '@domain/user/entities/User';

export type ILinkNotesGetAllPublicRequest = {
  session: User;
  linkId: number;
  sort?: 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt';
  size?: number;
  offset?: number;
};
