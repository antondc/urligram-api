import { Request, Response } from 'express';

import { IListUpdateOneRequest } from '@domain/list/useCases/interfaces/IListUpdateOneRequest';
import { IListUpdateOneUseCase } from '@domain/list/useCases/ListUpdateOneUseCase';
import { User } from '@domain/user/entities/User';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
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
    const session = tokenService.verifyToken(req.cookies.sessionToken) as User;

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
        self: URL_SERVER + '/list',
      },
      data: [
        {
          type: 'list',
          id: response?.id,
          session: {
            self: URL_SERVER + '/list',
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
