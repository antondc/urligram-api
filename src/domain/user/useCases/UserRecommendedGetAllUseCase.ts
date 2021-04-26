import { ILinkGetStatisticsUseCase } from '@domain/link/useCases/LinkGetStatistics';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserRecommendedGetAllRequest } from './interfaces/IUserRecommendedGetAllRequest';
import { IUserRecommendedGetAllResponse } from './interfaces/IUserRecommendedGetAllResponse';

export interface IUserRecommendedGetAllUseCase {
  execute: (userRecommendedGetAllRequest: IUserRecommendedGetAllRequest) => Promise<IUserRecommendedGetAllResponse>;
}

export class UserRecommendedGetAllUseCase implements IUserRecommendedGetAllUseCase {
  private userRepo: IUserRepo;
  private linkGetStatisticsUseCase: ILinkGetStatisticsUseCase;

  constructor(userRepo: IUserRepo, linkGetStatisticsUseCase: ILinkGetStatisticsUseCase) {
    this.userRepo = userRepo;
    this.linkGetStatisticsUseCase = linkGetStatisticsUseCase;
  }

  public async execute(userRecommendedGetAllRequest: IUserRecommendedGetAllRequest): Promise<IUserRecommendedGetAllResponse> {
    const { session, size, sort, offset } = userRecommendedGetAllRequest;

    const { bookmarks, meta } = await this.userRepo.userRecommended({ userId: session?.id, size, sort, offset });

    const bookmarksWithVotesPromises = bookmarks?.map(async (item) => {
      const statistics = await this.linkGetStatisticsUseCase.execute({ linkId: item.linkId, session });

      return {
        ...item,
        statistics,
      };
    });
    const bookmarksWithVotes = await Promise.all(bookmarksWithVotesPromises);

    return {
      bookmarks: bookmarksWithVotes,
      meta,
    };
  }
}
