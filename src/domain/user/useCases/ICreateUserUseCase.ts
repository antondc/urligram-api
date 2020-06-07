import { ICreateUserDTO } from '../dto/ICreateUserDTO';

export interface ICreateUserUseCase {
  execute: (createUserDTO: ICreateUserDTO) => void;
}
