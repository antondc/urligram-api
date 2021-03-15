import { Request, Response } from 'express';

import { IListUserDeleteOneRequest } from '@domain/list/useCases/interfaces/IListUserDeleteOneRequest';
import { IListUserDeleteOneUseCase } from '@domain/list/useCases/ListUserDeleteOneUseCase';
import { User } from '@domain/user/entities/User';
import { URL_SERVER } from '@shared/constants/env';
import { TokenService } from '@shared/services/TokenService';
import { BaseController } from './BaseController';

export class ListUserDeleteOneController extends BaseController {
  useCase: IListUserDeleteOneUseCase;

  constructor(useCase: IListUserDeleteOneUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { listId, userId } = req.params;
    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

    const listUserDeleteOneRequest: IListUserDeleteOneRequest = {
      listId: Number(listId),
      userId,
      session,
    };

    const response = await this.useCase.execute(listUserDeleteOneRequest);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/lists/' + listId + '/users/' + userId,
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
