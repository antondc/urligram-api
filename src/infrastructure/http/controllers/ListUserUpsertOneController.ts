import { TokenJWT } from '@antoniodcorrea/utils';
import { Request, Response } from 'express';

import { IListUserUpsertOneRequest } from '@domain/list/useCases/interfaces/IListUserUpsertOneRequest';
import { ListUserUpsertOneUseCase } from '@domain/list/useCases/ListUserUpsertOneUseCase';
import { User } from '@domain/user/entities/User';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { JWT_SECRET } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListUserUpsertOneController extends BaseController {
  useCase: ListUserUpsertOneUseCase;

  constructor(useCase: ListUserUpsertOneUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { listId, userId } = req.params;
    const { userRole } = req.body;
    const tokenService = new TokenJWT(JWT_SECRET);
    const session = tokenService.decodeToken<User>(req.cookies.sessionToken);
    const userOrSession = userId === 'me' ? session?.id : userId;

    const listUserUpsertOne: IListUserUpsertOneRequest = {
      listId: Number(listId),
      userId: userOrSession,
      userRole,
      session,
    };

    const response = await this.useCase.execute(listUserUpsertOne);

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
