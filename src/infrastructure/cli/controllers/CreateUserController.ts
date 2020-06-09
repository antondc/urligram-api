import { CreateUserAdapter } from '@adapter/CreateUserAdapter';
import { CreateUserRepo } from '@infrastructure/persistence/mySQL/repositories/CreateUserRepo';
import { CreateUserUseCase } from '@domain/user/useCases/CreateUserUseCase';
import { ICreateUserRequestDTO } from '@domain/user/dto/ICreateUserRequestDTO';
import { ICreateUserResponseDTO } from '@domain/user/dto/ICreateUserResponseDTO';

export class CreateUser {
  createUserDTO;

  constructor(createUserDTO: ICreateUserRequestDTO) {
    this.createUserDTO = createUserDTO;
  }

  async execute(): Promise<ICreateUserResponseDTO> {
    const userRepo = new CreateUserRepo();
    const createUserUseCase = new CreateUserUseCase(userRepo);
    const createUserAdapter = new CreateUserAdapter(createUserUseCase, this.createUserDTO);

    const response = await createUserAdapter.createUser();

    return response;
  }
}
