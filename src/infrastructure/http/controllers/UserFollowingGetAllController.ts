import { Request, Response } from 'express';

import { IUserFollowingGetAllUseCase } from '@domain/user/useCases/UserFollowingGetAllUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserFollowingGetAllController extends BaseController {
  useCase: IUserFollowingGetAllUseCase;

  constructor(useCase: IUserFollowingGetAllUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { userId } = req.params;

    const response = await this.useCase.execute({ userId });

    const formattedItems = response.map((item) => {
      return {
        type: 'user',
        id: item.id,
        session: {
          self: URL_SERVER + '/users/' + item.id,
        },
        attributes: {
          ...item,
        },
      };
    });

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/users/' + userId + '/following',
      },
      data: formattedItems,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
