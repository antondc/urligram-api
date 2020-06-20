import { CreateUserController } from '@infrastructure/cli/controllers/CreateUserController';
import { CreateUserRepo } from '@infrastructure/persistence/mySQL/repositories/CreateUserRepo';
import { CreateUserUseCase } from '@domain/user/useCases/CreateUserUseCase';
import { ICreateUserRequestDTO } from '@domain/user/dto/ICreateUserRequestDTO';
import { ICreateUserResponseDTO } from '@domain/user/dto/ICreateUserResponseDTO';
import { FindUserRepo } from '@infrastructure/persistence/mySQL/repositories/FindUserRepo';

export class CreateUserRoute {
  createUserDTO;

  constructor(createUserDTO: ICreateUserRequestDTO) {
    this.createUserDTO = createUserDTO;
  }

  async execute(): Promise<ICreateUserResponseDTO> {
    const userRepo = new CreateUserRepo();
    const findUserRepo = new FindUserRepo();

    const createUserUseCase = new CreateUserUseCase(userRepo, findUserRepo);
    const createUserController = new CreateUserController(createUserUseCase, this.createUserDTO);

    const response = await createUserController.createUser();

    return response;
  }
}
