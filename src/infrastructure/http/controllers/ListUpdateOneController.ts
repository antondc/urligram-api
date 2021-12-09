import { Request, Response } from 'express';

import { IListUpdateOneRequest } from '@domain/list/useCases/interfaces/IListUpdateOneRequest';
import { IListUpdateOneUseCase } from '@domain/list/useCases/ListUpdateOneUseCase';
import { User } from '@domain/user/entities/User';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { TokenService } from '@shared/services/TokenService';
import { BaseController } from './BaseController';

export class ListUpdateOneController extends BaseController {
  useCase: IListUpdateOneUseCase;

  constructor(useCase: IListUpdateOneUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { listId } = req.params;
    const { name, description, isPrivate } = req.body;

    const tokenService = new TokenService();
    const session = tokenService.decodeToken<User>(req.cookies.sessionToken);

    const listUpdateOneRequest: IListUpdateOneRequest = {
      listId: Number(listId),
      name,
      description,
      isPrivate,
      session,
    };

    const response = await this.useCase.execute(listUpdateOneRequest);

    const formattedResponse = {
      lists: {
        self: URL_SERVER + PATH_API_V1 + '/list',
      },
      data: {
        type: 'list',
        id: response?.id,
        session: {
          self: URL_SERVER + PATH_API_V1 + '/list',
        },
        attributes: response,
        relationships: {},
      },
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
