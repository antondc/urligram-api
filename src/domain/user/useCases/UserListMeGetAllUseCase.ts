import { IUserListMeGetAllRequestDTO } from '@domain/user/dto/IUserListMeGetAllRequestDTO';
import { IUserListMeGetAllResponseDTO } from '@domain/user/dto/IUserListMeGetAllResponseDTO';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';

export interface IUserListMeGetAllUseCase {
  execute: (userListMeGetAllRequestDTO: IUserListMeGetAllRequestDTO) => Promise<IUserListMeGetAllResponseDTO>;
}

export class UserListMeGetAllUseCase implements IUserListMeGetAllUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userListMeGetAllRequestDTO: IUserListMeGetAllRequestDTO): Promise<IUserListMeGetAllResponseDTO> {
    const response = await this.userRepo.userListMeGetAll(userListMeGetAllRequestDTO);

    return response;
  }
}
