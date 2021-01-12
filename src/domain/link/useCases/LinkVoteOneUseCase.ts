import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { RequestError } from '@shared/errors/RequestError';
import { ILinkVoteOneRequest } from './interfaces/ILinkVoteOneRequest';
import { ILinkVoteOneResponse } from './interfaces/ILinkVoteOneResponse';
import { ILinkGetOneUseCase } from './LinkGetOneUseCase';

export interface ILinkVoteOneUseCase {
  execute: (linkGetOneRequest: ILinkVoteOneRequest) => Promise<ILinkVoteOneResponse>;
}

export class LinkVoteOneUseCase implements ILinkVoteOneUseCase {
  private linkRepo: ILinkRepo;
  private linkGetOneUseCase: ILinkGetOneUseCase;

  constructor(linkRepo: ILinkRepo, linkGetOneUseCase: ILinkGetOneUseCase) {
    this.linkRepo = linkRepo;
    this.linkGetOneUseCase = linkGetOneUseCase;
  }

  public async execute(linkGetOneRequest: ILinkVoteOneRequest): Promise<ILinkVoteOneResponse> {
    const { session, linkId, vote } = linkGetOneRequest;
    const response = await this.linkRepo.linkVoteOne({ linkId, userId: session?.id, vote });

    if (!response) throw new RequestError('Link not found', 404, { message: '404 Not found' });
    const link = await this.linkGetOneUseCase.execute({ linkId: response.id, session });

    return link;
  }
}
