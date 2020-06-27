import { Request, Response } from 'express';

import { IUserFollowersGetAllUseCase } from '@domain/user/useCases/UserFollowersGetAllUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserFollowersGetAllController extends BaseController {
  useCase: IUserFollowersGetAllUseCase;

  constructor(useCase: IUserFollowersGetAllUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { id } = req.params;

    const response = await this.useCase.execute({ id });

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/users/followers' + id,
      },
      data: [
        {
          type: 'user',
          session: {
            self: URL_SERVER + '/users/followers' + id,
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
