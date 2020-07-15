import { Request, Response } from 'express';

import { IUserFollowerGetAllRequest } from '@domain/user/useCases/interfaces/IUserFollowerGetAllRequest';
import { IUserFollowerGetAllUseCase } from '@domain/user/useCases/UserFollowerGetAllUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserFollowerGetAllController extends BaseController {
  useCase: IUserFollowerGetAllUseCase;

  constructor(useCase: IUserFollowerGetAllUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { userId } = req.params;

    const userFollowerGetAllRequest: IUserFollowerGetAllRequest = {
      userId,
    };
    const response = await this.useCase.execute(userFollowerGetAllRequest);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/users/followers' + userId,
      },
      data: [
        {
          type: 'user',
          session: {
            self: URL_SERVER + '/users/followers' + userId,
          },
          attributes: response,
          relationships: {},
        },
      ],
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
