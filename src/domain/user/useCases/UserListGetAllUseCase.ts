import { IUserListGetAllRequestDTO } from '@domain/user/dto/IUserListGetAllRequestDTO';
import { IUserListGetAllResponseDTO } from '@domain/user/dto/IUserListGetAllResponseDTO';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';

export interface IUserListGetAllUseCase {
  execute: (userListGetAllRequestDTO: IUserListGetAllRequestDTO) => Promise<IUserListGetAllResponseDTO>;
}

export class UserListGetAllUseCase implements IUserListGetAllUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userListGetAllRequestDTO: IUserListGetAllRequestDTO): Promise<IUserListGetAllResponseDTO> {
    const { userId, session } = userListGetAllRequestDTO;

    const response = await this.userRepo.userListGetAll(userListGetAllRequestDTO);

    if (userId !== session?.id) return response.filter((item) => userId !== session?.id && !item.isPrivate);

    return response;
  }
}
