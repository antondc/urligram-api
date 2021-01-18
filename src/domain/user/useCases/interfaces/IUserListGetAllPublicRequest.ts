import { User } from "@domain/user/entities/User";

export interface IUserListGetAllPublicRequest {
  userId: string;
  session: User;
}
