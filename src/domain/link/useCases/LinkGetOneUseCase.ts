import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { RequestError } from '@shared/errors/RequestError';
import { ILinkGetOneRequest } from './interfaces/ILinkGetOneRequest';
import { ILinkGetOneResponse } from './interfaces/ILinkGetOneResponse';

export interface ILinkGetOneUseCase {
  execute: (linkGetOneRequest: ILinkGetOneRequest) => Promise<ILinkGetOneResponse>;
}

export class LinkGetOneUseCase implements ILinkGetOneUseCase {
  private linkRepo: ILinkRepo;

  constructor(linkRepo: ILinkRepo) {
    this.linkRepo = linkRepo;
  }

  public async execute(linkGetOneRequest: ILinkGetOneRequest): Promise<ILinkGetOneResponse> {
    const { session, linkId } = linkGetOneRequest;
    const response = await this.linkRepo.linkGetOne({ linkId, userId: session?.id });

    if (!response) throw new RequestError('Link not found', 404, { message: '404 Not found' });

    return response;
  }
}
