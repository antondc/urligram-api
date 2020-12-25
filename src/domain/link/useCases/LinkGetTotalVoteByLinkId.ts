import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
// import { RequestError } from '@shared/errors/RequestError';
import { ILinkGetTotalVoteByLinkIdRequest } from './interfaces/ILinkGetTotalVoteByLinkIdRequest';
import { ILinkGetTotalVoteByLinkIdResponse } from './interfaces/ILinkGetTotalVoteByLinkIdResponse';

export interface ILinkGetTotalVoteByLinkIdUseCase {
  execute: (linkGetTotalVoteByLinkIdRequest: ILinkGetTotalVoteByLinkIdRequest) => Promise<ILinkGetTotalVoteByLinkIdResponse>;
}

export class LinkGetTotalVoteByLinkIdUseCase implements ILinkGetTotalVoteByLinkIdUseCase {
  private linkRepo: ILinkRepo;

  constructor(linkRepo: ILinkRepo) {
    this.linkRepo = linkRepo;
  }

  public async execute(linkGetTotalVoteByLinkIdRequest: ILinkGetTotalVoteByLinkIdRequest): Promise<ILinkGetTotalVoteByLinkIdResponse> {
    const { linkId } = linkGetTotalVoteByLinkIdRequest;
    const votes = await this.linkRepo.linkGetVotesByLinkId({ linkId });
    if (!votes.length) return { averageVote: null };

    const votesArray = votes.map((item) => item.vote);
    const averageVote = votesArray.reduce((acc, curr) => (!!curr ? ++acc : --acc), 0);

    return { averageVote };
  }
}
