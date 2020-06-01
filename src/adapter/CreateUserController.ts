import { ICreateUserUseCase } from 'Application/ICreateUserUseCase';
import { ICreateUserDTO } from 'Application/ICreateUserDTO';

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
