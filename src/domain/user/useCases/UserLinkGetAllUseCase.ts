import { IUserLinkGetAllResponseDTO } from '@domain/user/dto/IUserLinkGetAllResponseDTO';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserLinkGetAllRequestDTO } from '../dto/IUserLinkGetAllRequestDTO';

export interface IUserLinkGetAllUseCase {
  execute: (userLinkGetAllRequestDTO: IUserLinkGetAllRequestDTO) => Promise<IUserLinkGetAllResponseDTO>;
}

export class UserLinkGetAllUseCase implements IUserLinkGetAllUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userLinkGetAllRequestDTO: IUserLinkGetAllRequestDTO): Promise<IUserLinkGetAllResponseDTO> {
    const response = await this.userRepo.userLinkGetAll(userLinkGetAllRequestDTO);

    return response;
  }
}
