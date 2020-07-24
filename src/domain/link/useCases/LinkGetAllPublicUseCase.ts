import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { ILinkGetAllPublicRequest } from './interfaces/ILinkGetAllPublicRequest';
import { ILinkGetAllPublicResponse } from './interfaces/ILinkGetAllPublicResponse';

export interface ILinkGetAllPublicUseCase {
  execute: (linkGetAllPublicRequest: ILinkGetAllPublicRequest) => Promise<ILinkGetAllPublicResponse>;
}

export class LinkGetAllPublicUseCase implements ILinkGetAllPublicUseCase {
  private linkRepo: ILinkRepo;

  constructor(linkRepo: ILinkRepo) {
    this.linkRepo = linkRepo;
  }

  public async execute(linkGetAllPublicRequest: ILinkGetAllPublicRequest): Promise<ILinkGetAllPublicResponse> {
    const { session } = linkGetAllPublicRequest;
    const response = await this.linkRepo.linkGetAllPublic({ userId: session?.id });

    return response;
  }
}

/* --- DOC ---
  Returns a collection of public links
*/
