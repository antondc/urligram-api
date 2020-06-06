import { ILoginUserRepo } from '@application/ILoginUserRepo';
import { ILoginUserDTO } from '@domain/ILoginUserDTO';

export interface IUser {
  name: string;
  surname: string;
  loginUserRepo: ILoginUserRepo;
  authenticate(loginUserDTO: ILoginUserDTO): void;
}
