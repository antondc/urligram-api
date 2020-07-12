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
    // (1) If userId is sessionId, then return all; otherwise return only public lists
    const { userId, session } = userListGetAllRequestDTO;

    const response = await this.userRepo.userListGetAll(userListGetAllRequestDTO);

    const filteredResponse = response.filter((item) => userId === session?.id || !item.isPrivate); // (1)

    return filteredResponse;
  }
}
