export interface IUserUpdatePasswordRequestDTO {
  id: string;
  password: string;
  newPassword: string;
  newPasswordRepeated: string;
}
