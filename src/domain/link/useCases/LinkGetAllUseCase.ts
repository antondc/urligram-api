import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { ILinkGetAllRequest } from './interfaces/ILinkGetAllRequest';
import { ILinkGetAllResponse } from './interfaces/ILinkGetAllResponse';
import { ILinkGetStatisticsUseCase } from './LinkGetStatistics';

export interface ILinkGetAllUseCase {
  execute: (linkGetAllRequest: ILinkGetAllRequest) => Promise<ILinkGetAllResponse>;
}

export class LinkGetAllUseCase implements ILinkGetAllUseCase {
  private linkRepo: ILinkRepo;
  private linkGetStatisticsUseCase: ILinkGetStatisticsUseCase;

  constructor(linkRepo: ILinkRepo, linkGetStatisticsUseCase: ILinkGetStatisticsUseCase) {
    this.linkRepo = linkRepo;
    this.linkGetStatisticsUseCase = linkGetStatisticsUseCase;
  }

  public async execute(linkGetAllRequest: ILinkGetAllRequest): Promise<ILinkGetAllResponse> {
    const { session, sort, size, offset, filter } = linkGetAllRequest;

    const { links, meta } = await this.linkRepo.linkGetAll({ sessionId: session?.id, sort, size, offset, filter });

    const linksWithVotesPromises = links.map(async (item) => {
      const statistics = await this.linkGetStatisticsUseCase.execute({ linkId: item.id, session });

      return {
        ...item,
        statistics,
      };
    });
    const linksWithVotes = await Promise.all(linksWithVotesPromises);

    return {
      meta,
      links: linksWithVotes,
    };
  }
}

/* --- DOC ---
  Returns a collection of public links
*/
