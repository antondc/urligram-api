import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
// import { RequestError } from '@shared/errors/RequestError';
import { ILinkGetAvgVoteByLinkIdRequest } from './interfaces/ILinkGetAvgVoteByLinkIdRequest';
import { ILinkGetAvgVoteByLinkIdResponse } from './interfaces/ILinkGetAvgVoteByLinkIdResponse';

export interface ILinkGetAvgVoteByLinkIdUseCase {
  execute: (linkGetAvgVoteByLinkIdRequest: ILinkGetAvgVoteByLinkIdRequest) => Promise<ILinkGetAvgVoteByLinkIdResponse>;
}

export class LinkGetAvgVoteByLinkIdUseCase implements ILinkGetAvgVoteByLinkIdUseCase {
  private linkRepo: ILinkRepo;

  constructor(linkRepo: ILinkRepo) {
    this.linkRepo = linkRepo;
  }

  public async execute(linkGetAvgVoteByLinkIdRequest: ILinkGetAvgVoteByLinkIdRequest): Promise<ILinkGetAvgVoteByLinkIdResponse> {
    const { linkId } = linkGetAvgVoteByLinkIdRequest;
    const { votes } = await this.linkRepo.linkGetVotesByLinkId({ linkId });

    const averageVote = votes.reduce((acc, curr) => (curr === 1 ? ++acc : --acc), 0);
    // if (!response) throw new RequestError('Link not found', 404, { message: '404 Not found' });

    return { averageVote };
  }
}
