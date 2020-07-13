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
    // Returns relation of user <=> link
    // (1) If userId is sessionId, then return all; otherwise return only public links

    const { userId, session } = userLinkGetAllRequestDTO;

    const response = await this.userRepo.userLinkGetAll(userLinkGetAllRequestDTO);

    const filteredResponse = response.filter((item) => session?.id === userId || !item.isPrivate); // (1)

    return filteredResponse;
  }
}
