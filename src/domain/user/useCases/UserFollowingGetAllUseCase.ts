import { IUserFollowingGetAllRequestDTO } from '@domain/user/dto/IUserFollowingGetAllRequestDTO';
import { IUserFollowingGetAllResponseDTO } from '@domain/user/dto/IUserFollowingGetAllResponseDTO';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';

export interface IUserFollowingGetAllUseCase {
  execute: (getFollowingDTO: IUserFollowingGetAllRequestDTO) => Promise<IUserFollowingGetAllResponseDTO>;
}

export class UserFollowingGetAllUseCase implements IUserFollowingGetAllUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(getFollowingDTO: IUserFollowingGetAllRequestDTO): Promise<IUserFollowingGetAllResponseDTO> {
    const response = await this.userRepo.userFollowingGetAll(getFollowingDTO);

    return response;
  }
}
