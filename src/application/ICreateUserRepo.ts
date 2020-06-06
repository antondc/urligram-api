import { ICreateUserDTO } from '@application/ICreateUserDTO';

export interface ICreateUserRepo {
  save: (createUserDTO: ICreateUserDTO) => void;
}
