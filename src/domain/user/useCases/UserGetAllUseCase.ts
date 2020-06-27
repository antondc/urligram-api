import { IUserGetAllResponseDTO } from '@domain/user/dto/IUserGetAllResponseDTO';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';

export interface IUserGetAllUseCase {
  execute: () => Promise<IUserGetAllResponseDTO>;
}

export class UserGetAllUseCase implements IUserGetAllUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(): Promise<IUserGetAllResponseDTO> {
    const response = await this.userRepo.userGetAll();

    return response;
  }
}
