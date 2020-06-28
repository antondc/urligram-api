import { ILinkGetOneRequestDTO } from '@domain/link/dto/ILinkGetOneRequestDTO';
import { ILinkGetOneResponseDTO } from '@domain/link/dto/ILinkGetOneResponseDTO';
import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';

export interface ILinkGetOneUseCase {
  execute: (linkGetOneRequestDTO: ILinkGetOneRequestDTO) => Promise<ILinkGetOneResponseDTO>;
}

export class LinkGetOneUseCase implements ILinkGetOneUseCase {
  private linkRepo: ILinkRepo;

  constructor(linkRepo: ILinkRepo) {
    this.linkRepo = linkRepo;
  }

  public async execute(linkGetOneRequestDTO: ILinkGetOneRequestDTO): Promise<ILinkGetOneResponseDTO> {
    const response = await this.linkRepo.linkGetOne(linkGetOneRequestDTO);

    return response;
  }
}
