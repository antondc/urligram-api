import { IUserFollowingDeleteRequestDTO } from '@domain/user/dto/IUserFollowingDeleteRequestDTO';
import { IUserFollowingDeleteResponseDTO } from '@domain/user/dto/IUserFollowingDeleteResponseDTO';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';

export interface IUserFollowingDeleteUseCase {
  execute: (userFollowingDeleteRequestDTO: IUserFollowingDeleteRequestDTO) => Promise<IUserFollowingDeleteResponseDTO>;
}

export class UserFollowingDeleteUseCase implements IUserFollowingDeleteUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userFollowingDeleteRequestDTO: IUserFollowingDeleteRequestDTO): Promise<IUserFollowingDeleteResponseDTO> {
    const response = await this.userRepo.userFollowingDelete(userFollowingDeleteRequestDTO);

    return response;
  }
}
