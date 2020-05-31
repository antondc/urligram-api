import { ICreateUserUseCase } from 'Application/ICreateUserUseCase';

export class CreateUserController {
  createUserUseCase: ICreateUserUseCase;

  constructor(createUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  createUser() {
    this.createUserUseCase.execute();
  }
}
