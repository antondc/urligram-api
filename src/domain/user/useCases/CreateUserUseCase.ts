import { User } from '@domain/user/entities/User';
import { ICreateUserRepo } from '../repositories/ICreateUserRepo';
import { ICreateUserRequestDTO } from '@domain/user/dto/ICreateUserRequestDTO';
import { ICreateUserResponseDTO } from '@domain/user/dto/ICreateUserResponseDTO';

export interface ICreateUserUseCase {
  execute: (createUserDTO: ICreateUserRequestDTO) => Promise<ICreateUserResponseDTO>;
}

export class CreateUserUseCase implements ICreateUserUseCase {
  private createUserRepo: ICreateUserRepo;

  constructor(createUserRepo: ICreateUserRepo) {
    this.createUserRepo = createUserRepo;
  }

  public async execute(createUserDTO: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO> {
    const response = await this.createUserRepo.save(createUserDTO);

    return response;
  }
}
