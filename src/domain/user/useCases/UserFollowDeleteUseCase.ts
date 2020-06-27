import { IUserFollowDeleteRequestDTO } from '@domain/user/dto/IUserFollowDeleteRequestDTO';
import { IUserFollowDeleteResponseDTO } from '@domain/user/dto/IUserFollowDeleteResponseDTO';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';

export interface IUserFollowDeleteUseCase {
  execute: (userFollowDeleteRequestDTO: IUserFollowDeleteRequestDTO) => Promise<IUserFollowDeleteResponseDTO>;
}

export class UserFollowDeleteUseCase implements IUserFollowDeleteUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userFollowDeleteRequestDTO: IUserFollowDeleteRequestDTO): Promise<IUserFollowDeleteResponseDTO> {
    const response = await this.userRepo.followDeleteUser(userFollowDeleteRequestDTO);

    return response;
  }
}
