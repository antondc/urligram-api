import { IGetUserResponseDTO } from '@domain/user/dto/IGetUserResponseDTO';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';

export interface IGetUserUseCase {
  execute: () => Promise<IGetUserResponseDTO>;
}

export class GetUsersUseCase implements IGetUserUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(): Promise<IGetUserResponseDTO> {
    const response = await this.userRepo.getAll();

    return response;
  }
}
