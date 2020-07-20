import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { ILinkGetAllRequest } from './interfaces/ILinkGetAllRequest';
import { ILinkGetAllResponse } from './interfaces/ILinkGetAllResponse';

export interface ILinkGetAllUseCase {
  execute: (linkGetAllRequest: ILinkGetAllRequest) => Promise<ILinkGetAllResponse>;
}

export class LinkGetAllUseCase implements ILinkGetAllUseCase {
  private linkRepo: ILinkRepo;

  constructor(linkRepo: ILinkRepo) {
    this.linkRepo = linkRepo;
  }

  public async execute(linkGetAllRequest: ILinkGetAllRequest): Promise<ILinkGetAllResponse> {
    const { session } = linkGetAllRequest;
    const response = await this.linkRepo.linkGetAll({ userId: session?.id });

    return response;
  }
}

/* --- DOC ---
  Returns a collection of links
  A link qualify for the collection if (MySQL)
    (2) Is public
    (3) Is private but user is owner of it
*/
