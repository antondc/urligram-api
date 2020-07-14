import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { IUserLinkUpdateRequestDTO } from '@domain/user/dto/IUserLinkUpdateRequestDTO';
import { IUserLinkUpdateResponseDTO } from '@domain/user/dto/IUserLinkUpdateResponseDTO';
import { URLWrapper } from '@infrastructure/services/UrlWrapper';
import { RequestError } from '@shared/errors/RequestError';
import { IUserRepo } from '../repositories/IUserRepo';

export interface IUserLinkUpdateUseCase {
  execute: (linkUpdateRequestDTO: IUserLinkUpdateRequestDTO) => Promise<IUserLinkUpdateResponseDTO>;
}

export class UserLinkUpdateUseCase implements IUserLinkUpdateUseCase {
  private linkRepo: ILinkRepo;
  private userRepo: IUserRepo;

  constructor(linkRepo: ILinkRepo, userRepo: IUserRepo) {
    this.linkRepo = linkRepo;
    this.userRepo = userRepo;
  }

  public async execute(linkUpdateRequestDTO: IUserLinkUpdateRequestDTO): Promise<IUserLinkUpdateResponseDTO> {
    const { url, session, linkId } = linkUpdateRequestDTO;
    const parsedUrl = new URLWrapper(url);
    const domain = parsedUrl.getDomain();
    const path = parsedUrl.getPath() + parsedUrl.getSearch();

    const formattedUserLinkUpdateRequest = {
      ...linkUpdateRequestDTO,
      domain,
      path,
      userId: session?.id,
    };

    const linkExists = await this.userRepo.userLinkGetOne({ linkId, userId: session?.id });
    if (!linkExists) throw new RequestError('Link link does not exist', 404, { message: '404 Not Found' });

    const result = await this.userRepo.userLinkUpdate(formattedUserLinkUpdateRequest);

    const response = await this.userRepo.userLinkGetOne({ linkId: result.id, userId: session?.id });

    return response;
  }
}
