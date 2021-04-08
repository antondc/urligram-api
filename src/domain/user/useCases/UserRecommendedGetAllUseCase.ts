import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserRecommendedGetAllRequest } from './interfaces/IUserRecommendedGetAllRequest';
import { IUserRecommendedGetAllResponse } from './interfaces/IUserRecommendedGetAllResponse';

export interface IUserRecommendedGetAllUseCase {
  execute: (userRecommendedGetAllRequest: IUserRecommendedGetAllRequest) => Promise<IUserRecommendedGetAllResponse>;
}

export class UserRecommendedGetAllUseCase implements IUserRecommendedGetAllUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userRecommendedGetAllRequest: IUserRecommendedGetAllRequest): Promise<IUserRecommendedGetAllResponse> {
    const { session, size, sort, offset } = userRecommendedGetAllRequest;

    const response = await this.userRepo.userRecommended({ userId: session?.id, size, sort, offset });

    return response;
  }
}
