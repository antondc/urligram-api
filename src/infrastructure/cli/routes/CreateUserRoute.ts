import { CreateUserController } from '@infrastructure/cli/controllers/CreateUserController';
import { UserRepo } from '@infrastructure/persistence/mySQL/repositories/UserRepo';
import { CreateUserUseCase } from '@domain/user/useCases/CreateUserUseCase';
import { ICreateUserRequestDTO } from '@domain/user/dto/ICreateUserRequestDTO';
import { ICreateUserResponseDTO } from '@domain/user/dto/ICreateUserResponseDTO';

export class CreateUserRoute {
  createUserDTO;

  constructor(createUserDTO: ICreateUserRequestDTO) {
    this.createUserDTO = createUserDTO;
  }

  async execute(): Promise<ICreateUserResponseDTO> {
    const userRepo = new UserRepo();

    const createUserUseCase = new CreateUserUseCase(userRepo);
    const createUserController = new CreateUserController(createUserUseCase, this.createUserDTO);

    const response = await createUserController.createUser();

    return response;
  }
}
