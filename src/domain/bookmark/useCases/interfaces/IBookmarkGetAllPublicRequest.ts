import { Bookmark } from '@domain/bookmark/entities/Bookmark';
import { User } from '@domain/user/entities/User';

export type IBookmarkGetAllPublicRequest = {
  session: User;
};
