import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
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
    const votes = await this.linkRepo.linkGetVotes({ linkId });
    if (!votes.length)
      return {
        absoluteVote: null,
        timesVoted: 0,
        averageVote: null,
        timesBookmarked: 0,
      };

    const votesArray = votes.map((item) => item.vote);
    const timesVoted = votesArray?.length;
    const timesPositiveVote = votesArray?.filter((item) => item === true)?.length;
    const absoluteVote = votesArray.reduce((acc, curr) => (!!curr ? ++acc : --acc), 0);
    const averageVote = !!timesVoted ? timesPositiveVote / timesVoted : null;

    return {
      absoluteVote,
      timesVoted: 0,
      averageVote,
      timesBookmarked: 0,
    };
  }
}
