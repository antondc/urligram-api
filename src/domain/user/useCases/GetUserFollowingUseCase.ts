import { IUserFollowingGetAllRequestDTO } from '@domain/user/dto/IUserFollowingGetAllRequestDTO';
import { IUserFollowingGetAllResponseDTO } from '@domain/user/dto/IUserFollowingGetAllResponseDTO';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';

export interface IGetUserFollowingUseCase {
  execute: (getFollowingDTO: IUserFollowingGetAllRequestDTO) => Promise<IUserFollowingGetAllResponseDTO>;
}

export class GetUserFollowingUseCase implements IGetUserFollowingUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(getFollowingDTO: IUserFollowingGetAllRequestDTO): Promise<IUserFollowingGetAllResponseDTO> {
    const response = await this.userRepo.followingGetAll(getFollowingDTO);

    return response;
  }
}
