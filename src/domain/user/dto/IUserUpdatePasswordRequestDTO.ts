import { User } from '@domain/user/entities/User';

export interface IUserUpdatePasswordRequestDTO {
  session: User;
  password: string;
  newPassword: string;
  newPasswordRepeated: string;
}
