import { ICreateUserDTO } from 'Root/src/application/ICreateUserDTO';

export interface ICreateUserRepo {
  save: (createUserDTO: ICreateUserDTO) => void;
}
