import { ICreateUserUseCase } from '@domain/user/useCases/ICreateUserUseCase';
import { ICreateUserDTO } from '@domain/user/dto/ICreateUserDTO';

export class CreateUserAdapter {
  createUserUseCase: ICreateUserUseCase;
  createUserDTO: ICreateUserDTO;

  constructor(createUserUseCase: ICreateUserUseCase, createUserDTO: ICreateUserDTO) {
    this.createUserDTO = createUserDTO;
    this.createUserUseCase = createUserUseCase;
  }

  async createUser() {
    const response = await this.createUserUseCase.execute(this.createUserDTO);

    return response;
  }
}
