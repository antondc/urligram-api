import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
// import { RequestError } from '@shared/errors/RequestError';
import { ILinkGetTotalVoteRequest } from './interfaces/ILinkGetTotalVoteRequest';
import { ILinkGetTotalVoteResponse } from './interfaces/ILinkGetTotalVoteResponse';

export interface ILinkGetTotalVoteUseCase {
  execute: (linkGetTotalVoteRequest: ILinkGetTotalVoteRequest) => Promise<ILinkGetTotalVoteResponse>;
}

export class LinkGetTotalVoteUseCase implements ILinkGetTotalVoteUseCase {
  private linkRepo: ILinkRepo;

  constructor(linkRepo: ILinkRepo) {
    this.linkRepo = linkRepo;
  }

  public async execute(linkGetTotalVoteRequest: ILinkGetTotalVoteRequest): Promise<ILinkGetTotalVoteResponse> {
    const { linkId } = linkGetTotalVoteRequest;
    const votes = await this.linkRepo.linkGetVotes({ linkId });
    if (!votes.length) return null;

    const votesArray = votes.map((item) => item.vote);
    const averageVote = votesArray.reduce((acc, curr) => (!!curr ? ++acc : --acc), 0);

    return averageVote;
  }
}
