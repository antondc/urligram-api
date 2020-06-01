import { ICreateUserDTO } from 'Root/src/application/ICreateUserDTO';

export interface ICreateUserRepo {
  save: (user: ICreateUserDTO) => void;
}
