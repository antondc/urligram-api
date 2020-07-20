import { Request, Response } from 'express';

import { IListGetAllRequest } from '@domain/list/useCases/interfaces/IListGetAllRequest';
import { IListGetAllUseCase } from '@domain/list/useCases/ListGetAllUseCase';
import { User } from '@domain/user/entities/User';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListGetAllController extends BaseController {
  useCase: IListGetAllUseCase;

  constructor(useCase: IListGetAllUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const tokenService = new TokenService();
    const session = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const listGetAllRequest: IListGetAllRequest = {
      session,
    };
    const response = await this.useCase.execute(listGetAllRequest);

    const formattedLists = response.map((item) => {
      return {
        type: 'list',
        id: item.id,
        session: {
          self: URL_SERVER + '/lists/' + item.id,
        },
        attributes: {
          ...item,
        },
      };
    });

    const formattedResponse = {
      lists: {
        self: URL_SERVER + '/lists',
      },
      data: formattedLists,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
