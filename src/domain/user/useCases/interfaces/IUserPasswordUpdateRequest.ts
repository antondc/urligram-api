import { User } from '@domain/user/entities/User';

export interface IUserPasswordUpdateRequest {
  session: User;
  password: string;
  newPassword: string;
  newPasswordRepeated: string;
}
