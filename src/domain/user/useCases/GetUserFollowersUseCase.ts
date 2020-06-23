import { IGetUserFollowersRequestDTO } from '@domain/user/dto/IGetUserFollowersRequestDTO';
import { IGetUserFollowersResponseDTO } from '@domain/user/dto/IGetUserFollowersResponseDTO';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';

export interface IGetUserFollowersUseCase {
  execute: (getFollowersDTO: IGetUserFollowersRequestDTO) => Promise<IGetUserFollowersResponseDTO>;
}

export class GetUserFollowersUseCase implements IGetUserFollowersUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(getFollowersDTO: IGetUserFollowersRequestDTO): Promise<IGetUserFollowersResponseDTO> {
    const response = await this.userRepo.getFollowers(getFollowersDTO);

    return response;
  }
}
