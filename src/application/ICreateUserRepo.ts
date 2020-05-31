import { IUser } from 'Domain/IUser';

export interface ICreateUserRepo {
  save: (user: IUser) => void;
}
