import { Request, Response } from 'express';

import { IUserFollowDeleteUseCase } from '@domain/user/useCases/UserFollowDeleteUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserFollowDeleteController extends BaseController {
  useCase: IUserFollowDeleteUseCase;

  constructor(useCase: IUserFollowDeleteUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { userId, followedId } = req.params;

    const response = await this.useCase.execute({ userId, followedId });

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/users/' + userId,
      },
      data: [
        {
          type: 'user',
          session: {
            self: URL_SERVER + '/users/' + userId,
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
