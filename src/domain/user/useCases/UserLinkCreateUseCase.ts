import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { IUserLinkCreateRequestDTO } from '@domain/user/dto/IUserLinkCreateRequestDTO';
import { IUserLinkCreateResponseDTO } from '@domain/user/dto/IUserLinkCreateResponseDTO';
import { URLWrapper } from '@infrastructure/services/UrlWrapper';
import { RequestError } from '@shared/errors/RequestError';
import { IUserRepo } from '../repositories/IUserRepo';

export interface IUserLinkCreateUseCase {
  execute: (linkCreateRequestDTO: IUserLinkCreateRequestDTO) => Promise<IUserLinkCreateResponseDTO>;
}

export class UserLinkCreateUseCase implements IUserLinkCreateUseCase {
  private linkRepo: ILinkRepo;
  private userRepo: IUserRepo;

  constructor(linkRepo: ILinkRepo, userRepo: IUserRepo) {
    this.linkRepo = linkRepo;
    this.userRepo = userRepo;
  }

  public async execute(linkCreateRequestDTO: IUserLinkCreateRequestDTO): Promise<IUserLinkCreateResponseDTO> {
    const { url, session, title } = linkCreateRequestDTO;
    const parsedUrl = new URLWrapper(url);
    const domain = parsedUrl.getDomain();
    const path = parsedUrl.getPath() + parsedUrl.getSearch();

    const formattedUserLinkCreateRequest = {
      ...linkCreateRequestDTO,
      domain,
      path,
      title: title ? title : domain + path,
    };

    const linkExist = await this.userRepo.userLinkGetOne({ ...formattedUserLinkCreateRequest, userId: session?.id });

    if (!!linkExist) throw new RequestError('Link already exists', 409, { message: '409 Conflict' });

    const result = await this.userRepo.userLinkCreate({ ...formattedUserLinkCreateRequest, userId: session.id });

    const response = await this.linkRepo.linkGetOne({ id: Number(result?.id) });

    return response;
  }
}
