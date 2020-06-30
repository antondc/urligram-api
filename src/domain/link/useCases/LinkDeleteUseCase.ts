import { ILinkDeleteRequestDTO } from '@domain/link/dto/ILinkDeleteRequestDTO';
import { ILinkDeleteResponseDTO } from '@domain/link/dto/ILinkDeleteResponseDTO';
import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';

export interface ILinkDeleteUseCase {
  execute: (linkDeleteRequestDTO: ILinkDeleteRequestDTO) => Promise<ILinkDeleteResponseDTO>;
}

export class LinkDeleteUseCase implements ILinkDeleteUseCase {
  private linkRepo: ILinkRepo;

  constructor(linkRepo: ILinkRepo) {
    this.linkRepo = linkRepo;
  }

  public async execute(linkDeleteRequestDTO: ILinkDeleteRequestDTO): Promise<ILinkDeleteResponseDTO> {
    const response = await this.linkRepo.linkDelete(linkDeleteRequestDTO);

    return response;
  }
}
