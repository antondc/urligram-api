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

  public async execute(userFollowingCreateRequestDTO: IUserFollowingCreateRequestDTO): Promise<IUserFollowingCreateResponseDTO> {
    const { session } = userFollowingCreateRequestDTO;

    const response = await this.userRepo.userFollowingCreate({ ...userFollowingCreateRequestDTO, userId: session?.id });

    return response;
  }
}
