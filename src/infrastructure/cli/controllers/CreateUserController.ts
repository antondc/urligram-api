import { IUserCreateRequestDTO } from '@domain/user/dto/IUserCreateRequestDTO';
import { IUserCreateUseCase } from '@domain/user/useCases/UserCreateUseCase';

export class CreateUserController {
  createUserUseCase: IUserCreateUseCase;
  createUserDTO: IUserCreateRequestDTO;

  constructor(createUserUseCase: IUserCreateUseCase, createUserDTO: IUserCreateRequestDTO) {
    this.createUserDTO = createUserDTO;
    this.createUserUseCase = createUserUseCase;
  }

  async execute() {
    const response = await this.createUserUseCase.execute(this.createUserDTO);

    return response;
  }
}
