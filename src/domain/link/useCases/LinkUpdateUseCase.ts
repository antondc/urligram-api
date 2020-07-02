import { ILinkUpdateRequestDTO } from '@domain/link/dto/ILinkUpdateRequestDTO';
import { ILinkUpdateResponseDTO } from '@domain/link/dto/ILinkUpdateResponseDTO';
import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { URLWrapper } from '@infrastructure/services/UrlWrapper';

export interface ILinkUpdateUseCase {
  execute: (linkUpdateRequestDTO: ILinkUpdateRequestDTO) => Promise<ILinkUpdateResponseDTO>;
}

export class LinkUpdateUseCase implements ILinkUpdateUseCase {
  private linkRepo: ILinkRepo;

  constructor(linkRepo: ILinkRepo) {
    this.linkRepo = linkRepo;
  }

  public async execute(linkUpdateRequestDTO: ILinkUpdateRequestDTO): Promise<ILinkUpdateResponseDTO> {
    const { url } = linkUpdateRequestDTO;
    const parsedUrl = new URLWrapper(url);
    const domain = parsedUrl.getDomain();
    const path = parsedUrl.getPath() + parsedUrl.getSearch();

    const formattedLinkUpdateRequest = {
      ...linkUpdateRequestDTO,
      domain,
      path,
    };

    const result = await this.linkRepo.linkUpdate(formattedLinkUpdateRequest);

    const linkGetOneRequestDTO = {
      id: Number(result?.id),
    };

    const response = await this.linkRepo.linkGetOne(linkGetOneRequestDTO);

    return response;
  }
}
