import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { RequestError } from '@shared/errors/RequestError';
import { ILinkListGetAllRequest } from './interfaces/ILinkListGetAllRequest';
import { ILinkListGetAllResponse } from './interfaces/ILinkListGetAllResponse';

export interface ILinkListGetAllUseCase {
  execute: (linkListGetAllRequest: ILinkListGetAllRequest) => Promise<ILinkListGetAllResponse>;
}

export class LinkListGetAllUseCase implements ILinkListGetAllUseCase {
  private linkRepo: ILinkRepo;

  constructor(linkRepo: ILinkRepo) {
    this.linkRepo = linkRepo;
  }

  public async execute(linkListGetAllRequest: ILinkListGetAllRequest): Promise<ILinkListGetAllResponse> {
    const { linkId, session } = linkListGetAllRequest;
    const result = await this.linkRepo.linkListGetAll({ linkId, userId: session?.id });

    if (!result) throw new RequestError('There are no links in this list', 404, { message: '404 Not Found' });

    return result;
  }
}
