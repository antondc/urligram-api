import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { RequestError } from '@shared/errors/RequestError';
import { ILinkVoteOneRequest } from './interfaces/ILinkVoteOneRequest';
import { ILinkVoteOneResponse } from './interfaces/ILinkVoteOneResponse';

export interface ILinkVoteOneUseCase {
  execute: (linkGetOneRequest: ILinkVoteOneRequest) => Promise<ILinkVoteOneResponse>;
}

export class LinkVoteOneUseCase implements ILinkVoteOneUseCase {
  private linkRepo: ILinkRepo;

  constructor(linkRepo: ILinkRepo) {
    this.linkRepo = linkRepo;
  }

  public async execute(linkGetOneRequest: ILinkVoteOneRequest): Promise<ILinkVoteOneResponse> {
    const { session, linkId, vote } = linkGetOneRequest;
    const response = await this.linkRepo.linkVoteOne({ linkId, userId: session?.id, vote });

    if (!response) throw new RequestError('Link not found', 404, { message: '404 Not found' });

    return response;
  }
}
