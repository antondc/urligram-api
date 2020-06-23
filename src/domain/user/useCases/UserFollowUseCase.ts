import { IUserFollowRequestDTO } from '@domain/user/dto/IUserFollowRequestDTO';
import { IUserFollowResponseDTO } from '@domain/user/dto/IUserFollowResponseDTO';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';

export interface IUserFollowUseCase {
  execute: (userFollowRequestDTO: IUserFollowRequestDTO) => Promise<IUserFollowResponseDTO>;
}

export class UserFollowUseCase implements IUserFollowUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userFollowRequestDTO: IUserFollowRequestDTO): Promise<IUserFollowResponseDTO> {
    const response = await this.userRepo.followUser(userFollowRequestDTO);

    return response;
  }
}
