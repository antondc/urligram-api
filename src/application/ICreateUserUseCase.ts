import { ICreateUserDTO } from './ICreateUserDTO';

export interface ICreateUserUseCase {
  execute: (createUserDTO: ICreateUserDTO) => void;
}
