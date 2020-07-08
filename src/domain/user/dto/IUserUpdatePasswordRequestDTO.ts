export interface IUserUpdatePasswordRequestDTO {
  id: string;
  name: string;
  password: string;
  newPassword: string;
  newPasswordRepeated: string;
}
