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
    // Return link owned by user or public (1)
    const { session } = linkGetOneRequestDTO;
    const response = await this.linkRepo.linkGetOne(linkGetOneRequestDTO);

    const linkedByUser = response.users.filter((user) => user?.id === session?.id).length > 0; // (1)
    if (!linkedByUser && !!response.isPrivate) throw new RequestError('There is no public link', 404, { message: '404 Conflict' });

    return response;
  }
}
