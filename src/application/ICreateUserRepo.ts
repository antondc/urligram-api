import { ICreateUserDTO } from '@root/src/application/ICreateUserDTO';

export interface ICreateUserRepo {
  save: (createUserDTO: ICreateUserDTO) => void;
}
