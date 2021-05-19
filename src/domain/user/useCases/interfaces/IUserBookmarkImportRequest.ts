import { User } from '@domain/user/entities/User';

export interface IUserBookmarkImportRequest {
  content: ParsedQs;
  session: User;
}
