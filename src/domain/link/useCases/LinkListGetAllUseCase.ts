import { ILinkListGetAllRequestDTO } from '@domain/link/dto/ILinkListGetAllRequestDTO';
import { ILinkListGetAllResponseDTO } from '@domain/link/dto/ILinkListGetAllResponseDTO';
import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { RequestError } from '@shared/errors/RequestError';

export interface ILinkListGetAllUseCase {
  execute: (linkListGetAllRequestDTO: ILinkListGetAllRequestDTO) => Promise<ILinkListGetAllResponseDTO>;
}

export class LinkListGetAllUseCase implements ILinkListGetAllUseCase {
  private linkRepo: ILinkRepo;

  constructor(linkRepo: ILinkRepo) {
    this.linkRepo = linkRepo;
  }

  public async execute(linkListGetAllRequestDTO: ILinkListGetAllRequestDTO): Promise<ILinkListGetAllResponseDTO> {
    const result = await this.linkRepo.linkListGetAll(linkListGetAllRequestDTO);

    if (!result) throw new RequestError('Link link does not exist', 404, { message: '404 Not Found' });

    return result;
  }
}
