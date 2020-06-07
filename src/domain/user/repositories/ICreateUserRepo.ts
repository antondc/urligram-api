import { ICreateUserDTO } from '@domain/user/dto/ICreateUserDTO';

export interface ICreateUserRepo {
  save: (createUserDTO: ICreateUserDTO) => Promise<ICreateUserDTO>;
}
