import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { RequestError } from '@shared/errors/RequestError';
import { ILinkTagGetAllRequest } from './interfaces/ILinkTagGetAllRequest';
import { ILinkTagGetAllResponse } from './interfaces/ILinkTagGetAllResponse';

export interface ILinkTagGetAllUseCase {
  execute: (linkTagGetAllRequest: ILinkTagGetAllRequest) => Promise<ILinkTagGetAllResponse>;
}

export class LinkTagGetAllUseCase implements ILinkTagGetAllUseCase {
  private linkRepo: ILinkRepo;

  constructor(linkRepo: ILinkRepo) {
    this.linkRepo = linkRepo;
  }

  public async execute(linkTagGetAllRequest: ILinkTagGetAllRequest): Promise<ILinkTagGetAllResponse> {
    const result = await this.linkRepo.linkTagGetAll(linkTagGetAllRequest);

    if (!result) throw new RequestError('Link link does not exist', 404, { message: '404 Not Found' });

    return result;
  }
}
