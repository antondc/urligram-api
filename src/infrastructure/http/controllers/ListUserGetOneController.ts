import { Request, Response } from 'express';

import { IListUserGetOneRequest } from '@domain/list/useCases/interfaces/IListUserGetOneRequest';
import { IListUserGetOneUseCase } from '@domain/list/useCases/ListUserGetOneUseCase';
import { User } from '@domain/user/entities/User';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListUserGetOneController extends BaseController {
  useCase: IListUserGetOneUseCase;

  constructor(useCase: IListUserGetOneUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { listId, userId } = req.params;
    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

    const listUserGetOne: IListUserGetOneRequest = {
      listId: Number(listId),
      userId,
      session,
    };

    const response = await this.useCase.execute(listUserGetOne);

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
