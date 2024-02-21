import { Request, Response } from 'express';

import { TokenJWT } from '@antoniodcorrea/utils-backend';
import { IListUserDeleteOneRequest } from '@domain/list/useCases/interfaces/IListUserDeleteOneRequest';
import { IListUserDeleteOneUseCase } from '@domain/list/useCases/ListUserDeleteOneUseCase';
import { User } from '@domain/user/entities/User';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { JWT_SECRET } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListUserDeleteOneController extends BaseController {
  useCase: IListUserDeleteOneUseCase;

  constructor(useCase: IListUserDeleteOneUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { listId, userId } = req.params;
    const tokenService = new TokenJWT(JWT_SECRET);
    const session = tokenService.decodeToken<User>(req.cookies.sessionToken);
    const userOrSession = userId === 'me' ? session?.id : userId;

    const listUserDeleteOneRequest: IListUserDeleteOneRequest = {
      listId: Number(listId),
      userId: userOrSession,
      session,
    };

    const response = await this.useCase.execute(listUserDeleteOneRequest);

    const formattedResponse = {
      links: {
        self: URL_SERVER + PATH_API_V1 + '/lists/' + listId + '/users/' + userId,
      },
      data: {
        type: 'user',
        session: {
          self: URL_SERVER + PATH_API_V1 + '/users/' + userId,
        },
        attributes: response,
        relationships: {},
      },
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
