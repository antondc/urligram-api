import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
// import { RequestError } from '@shared/errors/RequestError';
import { ILinkGetStatisticsRequest } from './interfaces/ILinkGetStatisticsRequest';
import { ILinkGetStatisticsResponse } from './interfaces/ILinkGetStatisticsResponse';

export interface ILinkGetStatisticsUseCase {
  execute: (linkGetStatisticsRequest: ILinkGetStatisticsRequest) => Promise<ILinkGetStatisticsResponse>;
}

export class LinkGetStatisticsUseCase implements ILinkGetStatisticsUseCase {
  private linkRepo: ILinkRepo;

  constructor(linkRepo: ILinkRepo) {
    this.linkRepo = linkRepo;
  }

  public async execute(linkGetStatisticsRequest: ILinkGetStatisticsRequest): Promise<ILinkGetStatisticsResponse> {
    const { linkId } = linkGetStatisticsRequest;
    const votes = await this.linkRepo.linkGetStatistics({ linkId });
    if (!votes.length) return null;

    const votesArray = votes.map((item) => item.vote);
    const averageVote = votesArray.reduce((acc, curr) => (!!curr ? ++acc : --acc), 0);

    return averageVote;
  }
}
