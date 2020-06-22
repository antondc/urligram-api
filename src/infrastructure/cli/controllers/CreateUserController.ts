import { ICreateUserRequestDTO } from '@domain/user/dto/ICreateUserRequestDTO';
import { ICreateUserUseCase } from '@domain/user/useCases/CreateUserUseCase';

export class CreateUserController {
  createUserUseCase: ICreateUserUseCase;
  createUserDTO: ICreateUserRequestDTO;

  constructor(createUserUseCase: ICreateUserUseCase, createUserDTO: ICreateUserRequestDTO) {
    this.createUserDTO = createUserDTO;
    this.createUserUseCase = createUserUseCase;
  }

  async execute() {
    const response = await this.createUserUseCase.execute(this.createUserDTO);

    return response;
  }
}
