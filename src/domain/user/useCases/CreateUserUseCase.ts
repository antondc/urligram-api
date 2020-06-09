import { User } from '@domain/user/entities/User';
import { ICreateUserRepo } from '../repositories/ICreateUserRepo';
import { ICreateUserRequestDTO } from '@domain/user/dto/ICreateUserRequestDTO';
import { ICreateUserResponseDTO } from '@domain/user/dto/ICreateUserResponseDTO';

export interface ICreateUserUseCase {
  execute: (createUserDTO: ICreateUserRequestDTO) => Promise<ICreateUserResponseDTO>;
}

export class CreateUserUseCase {
  private createUserRepo: ICreateUserRepo;

  constructor(createUserRepo: ICreateUserRepo) {
    this.createUserRepo = createUserRepo;
  }

  public async execute(createUserDTO: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO> {
    const user = await new User(createUserDTO);

    const response = await this.createUserRepo.save(user);

    return response;
  }
}
