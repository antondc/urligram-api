import { Request, Response } from 'express';

import { IListGetOneUseCase } from '@domain/list/useCases/ListGetOneUseCase';
import { User } from '@domain/user/entities/User';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
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
    const session = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const listGetOneRequestDTO = {
      listId: Number(listId),
      session,
    };

    const response = await this.useCase.execute(listGetOneRequestDTO);

    const formattedResponse = {
      lists: {
        self: URL_SERVER + '/lists',
      },
      data: [
        {
          type: 'list',
          id: response.id,
          session: {
            self: URL_SERVER + '/lists/' + response.id,
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
