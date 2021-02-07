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
    const { session, sort, size, offset } = linkGetAllRequest;
    const response = await this.linkRepo.linkGetAll({ sessionId: session?.id, sort, size, offset });

    const responseWithVotesPromises = response.map(async (item) => {
      const statistics = await this.linkGetStatisticsUseCase.execute({ linkId: item.id, session });

      return {
        ...item,
        statistics,
      };
    });
    const responseWithVotes = await Promise.all(responseWithVotesPromises);

    return responseWithVotes;
  }
}

/* --- DOC ---
  Returns a collection of public links
*/
