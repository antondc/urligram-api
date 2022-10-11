import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { RequestError } from '@shared/errors/RequestError';
import { ILinkNotesGetAllPublicRequest } from './interfaces/ILinkNotesGetAllPublicRequest';
import { ILinkNotesGetAllPublicResponse } from './interfaces/ILinkNotesGetAllPublicResponse';

export interface ILinkNotesGetAllPublicUseCase {
  execute: (linkNotesGetAllRequest: ILinkNotesGetAllPublicRequest) => Promise<ILinkNotesGetAllPublicResponse>;
}

export class LinkNotesGetAllPublicUseCase implements ILinkNotesGetAllPublicUseCase {
  private linkRepo: ILinkRepo;

  constructor(linkRepo: ILinkRepo) {
    this.linkRepo = linkRepo;
  }

  public async execute(linkNotesGetAllRequest: ILinkNotesGetAllPublicRequest): Promise<ILinkNotesGetAllPublicResponse> {
    const result = await this.linkRepo.linkNotesGetAll(linkNotesGetAllRequest);

    if (!result) throw new RequestError('Link does not exist', 404, { message: '404 Not Found' });

    return result;
  }
}
