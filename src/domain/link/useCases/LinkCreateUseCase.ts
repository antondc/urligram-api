import { ILinkCreateRequestDTO } from '@domain/link/dto/ILinkCreateRequestDTO';
import { ILinkCreateResponseDTO } from '@domain/link/dto/ILinkCreateResponseDTO';
import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { URLWrapper } from '@infrastructure/services/UrlWrapper';

export interface ILinkCreateUseCase {
  execute: (linkCreateRequestDTO: ILinkCreateRequestDTO) => Promise<ILinkCreateResponseDTO>;
}

export class LinkCreateUseCase implements ILinkCreateUseCase {
  private linkRepo: ILinkRepo;

  constructor(linkRepo: ILinkRepo) {
    this.linkRepo = linkRepo;
  }

  public async execute(linkCreateRequestDTO: ILinkCreateRequestDTO): Promise<ILinkCreateResponseDTO> {
    const { url } = linkCreateRequestDTO;
    const parsedUrl = new URLWrapper(url);
    const domain = parsedUrl.getDomain();
    const path = parsedUrl.getPath() + parsedUrl.getSearch();

    const formattedLinkCreateRequest = {
      ...linkCreateRequestDTO,
      domain,
      path,
    };

    const { id } = await this.linkRepo.linkCreate(formattedLinkCreateRequest);

    const linkGetOneRequestDTO = {
      id: Number(id),
    };

    const response = await this.linkRepo.linkGetOne(linkGetOneRequestDTO);

    return response;
  }
}
