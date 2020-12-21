import { Request, Response } from 'express';

import { IListUserCreateOneRequest } from '@domain/list/useCases/interfaces/IListUserCreateOneRequest';
import { IListUserCreateOneUseCase } from '@domain/list/useCases/ListUserCreateOneUseCase';
import { User } from '@domain/user/entities/User';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListUserCreateOneController extends BaseController {
  useCase: IListUserCreateOneUseCase;

  constructor(useCase: IListUserCreateOneUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { listId, userId } = req.params;
    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

    const listUserCreateOne: IListUserCreateOneRequest = {
      listId: Number(listId),
      userId,
      session,
    };

    const response = await this.useCase.execute(listUserCreateOne);

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
