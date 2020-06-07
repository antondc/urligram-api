import { ILoginUserRepo } from '@domain/user/repositories/ILoginUserRepo';
import { ILoginUserDTO } from '@domain/user/dto/ILoginUserDTO';

export interface IUser {
  name: string;
  surname: string;
  loginUserRepo: ILoginUserRepo;
  authenticate(loginUserDTO: ILoginUserDTO): void;
}
