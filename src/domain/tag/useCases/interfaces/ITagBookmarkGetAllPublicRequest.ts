import { User } from '@domain/user/entities/User';

export type ITagBookmarkGetAllPublicRequest = {
  session: User;
  tagId: number;
};
