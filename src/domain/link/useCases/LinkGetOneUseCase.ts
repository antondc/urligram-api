import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { RequestError } from '@shared/errors/RequestError';
import { ILinkGetOneRequest } from './interfaces/ILinkGetOneRequest';
import { ILinkGetOneResponse } from './interfaces/ILinkGetOneResponse';
import { ILinkGetTotalVoteByLinkIdUseCase } from './LinkGetTotalVoteByLinkId';

export interface ILinkGetOneUseCase {
  execute: (linkGetOneRequest: ILinkGetOneRequest) => Promise<ILinkGetOneResponse>;
}

export class LinkGetOneUseCase implements ILinkGetOneUseCase {
  private linkRepo: ILinkRepo;
  private linkGetTotalVoteByLinkIdUseCase: ILinkGetTotalVoteByLinkIdUseCase;

  constructor(linkRepo: ILinkRepo, linkGetTotalVoteByLinkId: ILinkGetTotalVoteByLinkIdUseCase) {
    this.linkRepo = linkRepo;
    this.linkGetTotalVoteByLinkIdUseCase = linkGetTotalVoteByLinkId;
  }

  public async execute(linkGetOneRequest: ILinkGetOneRequest): Promise<ILinkGetOneResponse> {
    const { session, linkId } = linkGetOneRequest;
    const response = await this.linkRepo.linkGetOne({ linkId, userId: session?.id });

    if (!response) throw new RequestError('Link not found', 404, { message: '404 Not found' });

    const { averageVote } = await this.linkGetTotalVoteByLinkIdUseCase.execute({ linkId, session });

    const reponseWithAverageVote = {
      ...response,
      averageVote,
    };

    return reponseWithAverageVote;
  }
}
