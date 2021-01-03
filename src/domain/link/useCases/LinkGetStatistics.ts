import { IBookmarkRepo } from '@domain/bookmark/repositories/IBookmarkRepo';
import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { ILinkGetStatisticsRequest } from './interfaces/ILinkGetStatisticsRequest';
import { ILinkGetStatisticsResponse } from './interfaces/ILinkGetStatisticsResponse';

export interface ILinkGetStatisticsUseCase {
  execute: (linkGetStatisticsRequest: ILinkGetStatisticsRequest) => Promise<ILinkGetStatisticsResponse>;
}

export class LinkGetStatisticsUseCase implements ILinkGetStatisticsUseCase {
  private linkRepo: ILinkRepo;
  private bookmarkRepo: IBookmarkRepo;

  constructor(linkRepo: ILinkRepo, bookmarkRepo: IBookmarkRepo) {
    this.linkRepo = linkRepo;
    this.bookmarkRepo = bookmarkRepo;
  }

  public async execute(linkGetStatisticsRequest: ILinkGetStatisticsRequest): Promise<ILinkGetStatisticsResponse> {
    const { session, linkId } = linkGetStatisticsRequest;
    const votes = await this.linkRepo.linkGetVotes({ linkId });
    const bookmarks = await this.bookmarkRepo.bookmarkGetAllByLinkId({ linkId, userId: session?.id });
    const timesBookmarked = bookmarks.length;

    if (!votes.length)
      return {
        absoluteVote: null,
        timesVoted: 0,
        averageVote: null,
        timesBookmarked: 0,
        vote: null,
      };

    const { vote } = votes.find((item) => item.userId === session?.id) || { vote: null }; // We need to retrieve true | false; in case no value is retrieved, we set an explicit null.
    const votesArray = votes.map((item) => item.vote);
    const timesVoted = votesArray?.length;
    const timesPositiveVote = votesArray?.filter((item) => item === true)?.length;
    const absoluteVote = votesArray.reduce((acc, curr) => (!!curr ? ++acc : --acc), 0);
    const averageVote = !!timesVoted ? timesPositiveVote / timesVoted : null;

    return {
      absoluteVote,
      timesVoted,
      averageVote,
      timesBookmarked,
      vote,
    };
  }
}
