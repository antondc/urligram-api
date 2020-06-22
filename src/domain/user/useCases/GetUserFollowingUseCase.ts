import { IGetUserFollowingRequestDTO } from '@domain/user/dto/IGetUserFollowingRequestDTO';
import { IGetUserFollowingResponseDTO } from '@domain/user/dto/IGetUserFollowingResponseDTO';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';

export interface IGetUserFollowingUseCase {
  execute: (getFollowingDTO: IGetUserFollowingRequestDTO) => Promise<IGetUserFollowingResponseDTO>;
}

export class GetUserFollowingUseCase implements IGetUserFollowingUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(getFollowingDTO: IGetUserFollowingRequestDTO): Promise<IGetUserFollowingResponseDTO> {
    const response = await this.userRepo.getFollowing(getFollowingDTO);

    return response;
  }
}
