import { Request, Response } from 'express';

import { IListGetOneRequest } from '@domain/list/useCases/interfaces/IListGetOneRequest.ts';
import { IListGetOneUseCase } from '@domain/list/useCases/ListGetOneUseCase';
import { User } from '@domain/user/entities/User';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { TokenService } from '@shared/services/TokenService';
import { BaseController } from './BaseController';

export class ListGetOneController extends BaseController {
  useCase: IListGetOneUseCase;

  constructor(useCase: IListGetOneUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { listId } = req.params;

    const tokenService = new TokenService();
    const session = tokenService.decodeToken<User>(req.cookies.sessionToken);

    const listGetOneRequest: IListGetOneRequest = {
      listId: Number(listId),
      session,
    };

    const response = await this.useCase.execute(listGetOneRequest);

    const formattedResponse = {
      lists: {
        self: URL_SERVER + PATH_API_V1 + '/lists',
      },
      data: {
        type: 'list',
        id: response.id,
        session: {
          self: URL_SERVER + PATH_API_V1 + '/lists/' + response.id,
        },
        attributes: response,
        relationships: {},
      },
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
