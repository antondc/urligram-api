import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { RequestError } from '@shared/errors/RequestError';
import { ILinkListGetAllPublicRequest } from './interfaces/ILinkListGetAllPublicRequest';
import { ILinkListGetAllPublicResponse } from './interfaces/ILinkListGetAllPublicResponse';

export interface ILinkListGetAllPublicUseCase {
  execute: (linkListGetAllPublicRequest: ILinkListGetAllPublicRequest) => Promise<ILinkListGetAllPublicResponse>;
}

export class LinkListGetAllPublicUseCase implements ILinkListGetAllPublicUseCase {
  private linkRepo: ILinkRepo;

  constructor(linkRepo: ILinkRepo) {
    this.linkRepo = linkRepo;
  }

  public async execute(linkListGetAllPublicRequest: ILinkListGetAllPublicRequest): Promise<ILinkListGetAllPublicResponse> {
    const { linkId } = linkListGetAllPublicRequest;

    const result = await this.linkRepo.linkListGetAllPublic({ linkId });
    if (!result) throw new RequestError('There are no links in this list', 404, { message: '404 Not Found' });

    return result;
  }
}

/* --- DOC ---
  Returns a collection of public lists related to a public link:
    (1) Bookmark is public
    (2) Bookmark is owned by user
*/
