import { IUserFollowersGetAllRequestDTO } from '@domain/user/dto/IUserFollowersGetAllRequestDTO';
import { IUserFollowersGetAllResponseDTO } from '@domain/user/dto/IUserFollowersGetAllResponseDTO';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';

export interface IUserFollowersGetAllUseCase {
  execute: (userFollowersGetAllDTO: IUserFollowersGetAllRequestDTO) => Promise<IUserFollowersGetAllResponseDTO>;
}

export class UserFollowersGetAllUseCase implements IUserFollowersGetAllUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userFollowersGetAllDTO: IUserFollowersGetAllRequestDTO): Promise<IUserFollowersGetAllResponseDTO> {
    const response = await this.userRepo.userFollowersGetAll(userFollowersGetAllDTO);

    return response;
  }
}
