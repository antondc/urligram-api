import { Request, Response } from 'express';

import { IListDeleteOneRequest } from '@domain/list/useCases/interfaces/IListDeleteOneRequest';
import { IListDeleteOneUseCase } from '@domain/list/useCases/ListDeleteOneUseCase';
import { User } from '@domain/user/entities/User';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { TokenService } from '@shared/services/TokenService';
import { BaseController } from './BaseController';

export class ListDeleteOneController extends BaseController {
  useCase: IListDeleteOneUseCase;

  constructor(useCase: IListDeleteOneUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { listId } = req.params;

    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

    const listDeleteOneRequest: IListDeleteOneRequest = {
      session,
      listId: Number(listId),
    };

    const response = await this.useCase.execute(listDeleteOneRequest);

    const formattedResponse = {
      lists: {
        self: URL_SERVER + PATH_API_V1 + '/lists/',
      },
      data: [
        {
          type: 'list',
          id: response?.listId,
          session: {
            self: URL_SERVER + PATH_API_V1 + '/lists/' + response?.listId,
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
