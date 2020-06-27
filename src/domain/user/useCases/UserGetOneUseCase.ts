import { IUserGetOneRequestDTO } from '@domain/user/dto/IUserGetOneRequestDTO';
import { IUserGetOneResponseDTO } from '@domain/user/dto/IUserGetOneResponseDTO';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';

export interface IUserGetOneUseCase {
  execute: (userGetOneDTO: IUserGetOneRequestDTO) => Promise<IUserGetOneResponseDTO>;
}

export class UserGetOneUseCase implements IUserGetOneUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userGetOneDTO: IUserGetOneRequestDTO): Promise<IUserGetOneResponseDTO> {
    const response = await this.userRepo.userGetOne(userGetOneDTO);

    return response;
  }
}
