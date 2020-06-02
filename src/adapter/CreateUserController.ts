import { ICreateUserUseCase } from '@application/ICreateUserUseCase';
import { ICreateUserDTO } from '@application/ICreateUserDTO';

export class CreateUserController {
  createUserUseCase: ICreateUserUseCase;
  createUserDTO: ICreateUserDTO;

  constructor(createUserUseCase: ICreateUserUseCase, createUserDTO: ICreateUserDTO) {
    this.createUserDTO = createUserDTO;
    this.createUserUseCase = createUserUseCase;
  }

  createUser() {
    this.createUserUseCase.execute(this.createUserDTO);
  }
}
