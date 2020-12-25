import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { RequestError } from '@shared/errors/RequestError';
import { ILinkGetOneRequest } from './interfaces/ILinkGetOneRequest';
import { ILinkGetOneResponse } from './interfaces/ILinkGetOneResponse';
import { ILinkGetTotalVoteUseCase } from './LinkGetTotalVote';

export interface ILinkGetOneUseCase {
  execute: (linkGetOneRequest: ILinkGetOneRequest) => Promise<ILinkGetOneResponse>;
}

export class LinkGetOneUseCase implements ILinkGetOneUseCase {
  private linkRepo: ILinkRepo;
  private linkGetTotalVoteUseCase: ILinkGetTotalVoteUseCase;

  constructor(linkRepo: ILinkRepo, linkGetTotalVote: ILinkGetTotalVoteUseCase) {
    this.linkRepo = linkRepo;
    this.linkGetTotalVoteUseCase = linkGetTotalVote;
  }

  public async execute(linkGetOneRequest: ILinkGetOneRequest): Promise<ILinkGetOneResponse> {
    const { session, linkId } = linkGetOneRequest;
    const response = await this.linkRepo.linkGetOne({ linkId, userId: session?.id });

    if (!response) throw new RequestError('Link not found', 404, { message: '404 Not found' });

    const averageVote = await this.linkGetTotalVoteUseCase.execute({ linkId, session });

    const reponseWithAverageVote = {
      ...response,
      averageVote,
    };

    return reponseWithAverageVote;
  }
}
