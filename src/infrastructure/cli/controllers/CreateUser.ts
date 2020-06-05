import { CreateUserController } from '@adapter/CreateUserController';
import { CreateUserRepo } from '@infrastructure/persistence/mySQL/repositories/CreateUserRepo';
import { CreateUserUseCase } from '@application/CreateUserUseCase';
import { ICreateUserDTO } from '@application/ICreateUserDTO';

export class CreateUser {
  createUserDTO;

  constructor(createUserDTO: ICreateUserDTO) {
    this.createUserDTO = createUserDTO;
  }

  async execute() {
    const userRepo = new CreateUserRepo();
    const createUserUseCase = new CreateUserUseCase(userRepo);
    const createUserController = new CreateUserController(createUserUseCase, this.createUserDTO);

    const response = await createUserController.createUser();

    return response;
  }
}
