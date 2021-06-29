import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserFollowingDeleteRequest } from '@domain/user/useCases/interfaces/IUserFollowingDeleteRequest';
import { IUserFollowingDeleteUseCase } from '@domain/user/useCases/UserFollowingDeleteUseCase';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { TokenService } from '@shared/services/TokenService';
import { BaseController } from './BaseController';

export class UserFollowingDeleteController extends BaseController {
  useCase: IUserFollowingDeleteUseCase;

  constructor(useCase: IUserFollowingDeleteUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { followedId } = req.params;

    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

    const userFollowingCreate: IUserFollowingDeleteRequest = {
      followedId,
      session,
    };

    const response = await this.useCase.execute(userFollowingCreate);

    const formattedResponse = {
      links: {
        self: URL_SERVER + PATH_API_V1 + '/users/following/' + response.userId,
      },
      data: {
        success: true,
      },
    };

    return res.status(200).send(formattedResponse);
  }
}
