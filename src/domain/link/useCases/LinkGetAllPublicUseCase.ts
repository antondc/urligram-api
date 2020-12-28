import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { ILinkGetAllPublicRequest } from './interfaces/ILinkGetAllPublicRequest';
import { ILinkGetAllPublicResponse } from './interfaces/ILinkGetAllPublicResponse';
import { ILinkGetStatisticsUseCase } from './LinkGetStatistics';

export interface ILinkGetAllPublicUseCase {
  execute: (linkGetAllPublicRequest: ILinkGetAllPublicRequest) => Promise<ILinkGetAllPublicResponse>;
}

export class LinkGetAllPublicUseCase implements ILinkGetAllPublicUseCase {
  private linkRepo: ILinkRepo;
  private linkGetStatisticsUseCase: ILinkGetStatisticsUseCase;

  constructor(linkRepo: ILinkRepo, linkGetStatisticsUseCase: ILinkGetStatisticsUseCase) {
    this.linkRepo = linkRepo;
    this.linkGetStatisticsUseCase = linkGetStatisticsUseCase;
  }

  public async execute(linkGetAllPublicRequest: ILinkGetAllPublicRequest): Promise<ILinkGetAllPublicResponse> {
    const { session } = linkGetAllPublicRequest;
    const response = await this.linkRepo.linkGetAllPublic({ userId: session?.id });

    const responseWithVotesPromises = response.map(async (item) => {
      const averageVote = await this.linkGetStatisticsUseCase.execute({ linkId: item.id, session });

      return {
        ...item,
        averageVote,
      };
    });
    const responseWithVotes = await Promise.all(responseWithVotesPromises);

    return responseWithVotes;
  }
}

/* --- DOC ---
  Returns a collection of public links
*/
