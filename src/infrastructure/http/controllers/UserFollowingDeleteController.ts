import { Request, Response } from 'express';

import { TokenJWT } from '@antoniodcorrea/utils-backend';
import { User } from '@domain/user/entities/User';
import { IUserFollowingDeleteRequest } from '@domain/user/useCases/interfaces/IUserFollowingDeleteRequest';
import { IUserFollowingDeleteUseCase } from '@domain/user/useCases/UserFollowingDeleteUseCase';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { JWT_SECRET } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserFollowingDeleteController extends BaseController {
  useCase: IUserFollowingDeleteUseCase;

  constructor(useCase: IUserFollowingDeleteUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { followedId } = req.params;

    const tokenService = new TokenJWT(JWT_SECRET);
    const session = tokenService.decodeToken<User>(req.cookies.sessionToken);

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
