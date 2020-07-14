import { ILinkGetOneRequestDTO } from '@domain/link/dto/ILinkGetOneRequestDTO';
import { ILinkGetOneResponseDTO } from '@domain/link/dto/ILinkGetOneResponseDTO';
import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { RequestError } from '@shared/errors/RequestError';

export interface ILinkGetOneUseCase {
  execute: (linkGetOneRequestDTO: ILinkGetOneRequestDTO) => Promise<ILinkGetOneResponseDTO>;
}

export class LinkGetOneUseCase implements ILinkGetOneUseCase {
  private linkRepo: ILinkRepo;

  constructor(linkRepo: ILinkRepo) {
    this.linkRepo = linkRepo;
  }

  public async execute(linkGetOneRequestDTO: ILinkGetOneRequestDTO): Promise<ILinkGetOneResponseDTO> {
    // Return link owned by user (1) or public (2)
    const { session } = linkGetOneRequestDTO;
    const response = await this.linkRepo.linkGetOne(linkGetOneRequestDTO);

    const linkedByUser = response.users.filter((userLink) => userLink?.id === session?.id).length > 0; // (1)
    const isPrivate = response.users.filter((userLink) => userLink.isPrivate).length > 0; // (2)
    if (!linkedByUser && !!isPrivate) throw new RequestError('Link not found', 404, { message: '404 Not found' });

    return response;
  }
}
