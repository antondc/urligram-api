import { ICreateUserUseCase } from '@domain/user/useCases/CreateUserUseCase';
import { ICreateUserRequestDTO } from '@domain/user/dto/ICreateUserRequestDTO';

export class CreateUserController {
  createUserUseCase: ICreateUserUseCase;
  createUserDTO: ICreateUserRequestDTO;

  constructor(createUserUseCase: ICreateUserUseCase, createUserDTO: ICreateUserRequestDTO) {
    this.createUserDTO = createUserDTO;
    this.createUserUseCase = createUserUseCase;
  }

  async createUser() {
    const response = await this.createUserUseCase.execute(this.createUserDTO);

    return response;
  }
}
