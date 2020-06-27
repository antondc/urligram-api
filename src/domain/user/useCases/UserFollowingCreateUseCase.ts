import { IUserFollowingCreateRequestDTO } from '@domain/user/dto/IUserFollowingCreateRequestDTO';
import { IUserFollowingCreateResponseDTO } from '@domain/user/dto/IUserFollowingCreateResponseDTO';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';

export interface IUserFollowingCreateUseCase {
  execute: (userFollowRequestDTO: IUserFollowingCreateRequestDTO) => Promise<IUserFollowingCreateResponseDTO>;
}

export class UserFollowingCreateUseCase implements IUserFollowingCreateUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userFollwingCreateRequestDTO: IUserFollowingCreateRequestDTO): Promise<IUserFollowingCreateResponseDTO> {
    const response = await this.userRepo.userFollowingCreate(userFollwingCreateRequestDTO);

    return response;
  }
}
