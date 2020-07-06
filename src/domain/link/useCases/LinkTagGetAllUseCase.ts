import { ILinkTagGetAllRequestDTO } from '@domain/link/dto/ILinkTagGetAllRequestDTO';
import { ILinkTagGetAllResponseDTO } from '@domain/link/dto/ILinkTagGetAllResponseDTO';
import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { RequestError } from '@shared/errors/RequestError';

export interface ILinkTagGetAllUseCase {
  execute: (linkTagGetAllRequestDTO: ILinkTagGetAllRequestDTO) => Promise<ILinkTagGetAllResponseDTO>;
}

export class LinkTagGetAllUseCase implements ILinkTagGetAllUseCase {
  private linkRepo: ILinkRepo;

  constructor(linkRepo: ILinkRepo) {
    this.linkRepo = linkRepo;
  }

  public async execute(linkTagGetAllRequestDTO: ILinkTagGetAllRequestDTO): Promise<ILinkTagGetAllResponseDTO> {
    const result = await this.linkRepo.linkTagGetAll(linkTagGetAllRequestDTO);

    if (!result) throw new RequestError('Link link does not exist', 404, { message: '404 Not Found' });

    return result;
  }
}
