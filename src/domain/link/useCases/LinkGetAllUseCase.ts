import { ILinkGetAllResponseDTO } from '@domain/link/dto/ILinkGetAllResponseDTO';
import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';

export interface ILinkGetAllUseCase {
  execute: () => Promise<ILinkGetAllResponseDTO>;
}

export class LinkGetAllUseCase implements ILinkGetAllUseCase {
  private linkRepo: ILinkRepo;

  constructor(linkRepo: ILinkRepo) {
    this.linkRepo = linkRepo;
  }

  public async execute(): Promise<ILinkGetAllResponseDTO> {
    const response = await this.linkRepo.linkGetAll();

    return response;
  }
}
