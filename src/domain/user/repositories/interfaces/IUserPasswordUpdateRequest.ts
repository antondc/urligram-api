export interface IUserPasswordUpdateRequest {
  userId: string;
  password: string;
  newPassword: string;
  newPasswordRepeated: string;
}
