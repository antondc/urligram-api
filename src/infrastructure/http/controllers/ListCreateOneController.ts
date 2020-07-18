import { Request, Response } from 'express';

import { IListCreateOneRequest } from '@domain/list/useCases/interfaces/IListCreateOneRequest';
import { IListCreateOneUseCase } from '@domain/list/useCases/ListCreateOneUseCase';
import { User } from '@domain/user/entities/User';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListCreateOneController extends BaseController {
  useCase: IListCreateOneUseCase;

  constructor(useCase: IListCreateOneUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { listName, listDescription, listIsPrivate } = req.body;

    const tokenService = new TokenService();
    const session = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const listCreateOneRequestDTO: IListCreateOneRequest = {
      session,
      listName,
      listDescription,
      listIsPrivate,
    };

    const response = await this.useCase.execute(listCreateOneRequestDTO);

    const formattedResponse = {
      lists: {
        self: URL_SERVER + '/lists/',
      },
      data: [
        {
          type: 'list',
          id: response?.id,
          session: {
            self: URL_SERVER + '/lists/' + response?.id,
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
