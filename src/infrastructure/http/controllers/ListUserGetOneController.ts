import { TokenJWT } from '@antoniodcorrea/utils';
import { Request, Response } from 'express';

import { IListUserGetOneRequest } from '@domain/list/useCases/interfaces/IListUserGetOneRequest';
import { IListUserGetOneUseCase } from '@domain/list/useCases/ListUserGetOneUseCase';
import { User } from '@domain/user/entities/User';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { JWT_SECRET } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListUserGetOneController extends BaseController {
  useCase: IListUserGetOneUseCase;

  constructor(useCase: IListUserGetOneUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { listId, userId } = req.params;
    const tokenService = new TokenJWT(JWT_SECRET);
    const session = tokenService.decodeToken<User>(req.cookies.sessionToken);
    const userOrSession = userId === 'me' ? session?.id : userId;

    const listUserGetOne: IListUserGetOneRequest = {
      listId: Number(listId),
      userId: userOrSession,
      session,
    };

    const response = await this.useCase.execute(listUserGetOne);

    const formattedResponse = {
      links: {
        self: URL_SERVER + PATH_API_V1 + '/lists/' + listId + '/users/' + userId,
      },
      data: [
        {
          type: 'user',
          session: {
            self: URL_SERVER + PATH_API_V1 + '/users/' + userId,
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
