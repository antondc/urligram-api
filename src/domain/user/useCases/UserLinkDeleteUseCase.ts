import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { IUserLinkDeleteRequestDTO } from '@domain/user/dto/IUserLinkDeleteRequestDTO';
import { IUserLinkDeleteResponseDTO } from '@domain/user/dto/IUserLinkDeleteResponseDTO';
import { RequestError } from '@shared/errors/RequestError';
import { IUserRepo } from '../repositories/IUserRepo';

export interface IUserLinkDeleteUseCase {
  execute: (UserlinkDeleteRequestDTO: IUserLinkDeleteRequestDTO) => Promise<IUserLinkDeleteResponseDTO>;
}

export class UserLinkDeleteUseCase implements IUserLinkDeleteUseCase {
  private linkRepo: ILinkRepo;
  private userRepo: IUserRepo;

  constructor(linkRepo: ILinkRepo, userRepo: IUserRepo) {
    this.linkRepo = linkRepo;
    this.userRepo = userRepo;
  }

  public async execute(UserlinkDeleteRequestDTO: IUserLinkDeleteRequestDTO): Promise<IUserLinkDeleteResponseDTO> {
    const { linkId, session } = UserlinkDeleteRequestDTO;
    const result = await this.linkRepo.linkGetOne({ ...UserlinkDeleteRequestDTO, id: linkId });
    if (!result) throw new RequestError('Not found', 404);

    const response = await this.userRepo.userLinkDelete({ ...UserlinkDeleteRequestDTO, userId: session?.id });

    return response;
  }
}
