import { ILinkGetAllResponseDTO } from '@domain/link/dto/ILinkGetAllResponseDTO';
import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { ILinkGetAllRequestDTO } from '../dto/ILinkGetAllRequestDTO';

export interface ILinkGetAllUseCase {
  execute: (linkGetAllRequestDTO: ILinkGetAllRequestDTO) => Promise<ILinkGetAllResponseDTO>;
}

export class LinkGetAllUseCase implements ILinkGetAllUseCase {
  private linkRepo: ILinkRepo;

  constructor(linkRepo: ILinkRepo) {
    this.linkRepo = linkRepo;
  }

  public async execute(linkGetAllRequestDTO: ILinkGetAllRequestDTO): Promise<ILinkGetAllResponseDTO> {
    // Return all links either owned by user or public (1)
    const { session } = linkGetAllRequestDTO;
    const response = await this.linkRepo.linkGetAll();

    const filteredResponse = response.filter((link) => {
      const linkedByUser = link.users.filter((user) => user?.id === session?.id).length > 0;

      return linkedByUser || !link.isPrivate; // (1)
    });

    return filteredResponse;
  }
}
