import { Request, Response } from 'express';

import { IListUserGetAllRequest } from '@domain/list/useCases/interfaces/IListUserGetAllRequest';
import { IListUserGetAllUseCase } from '@domain/list/useCases/ListUserGetAllUseCase';
import { User } from '@domain/user/entities/User';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListUserGetAllController extends BaseController {
  useCase: IListUserGetAllUseCase;

  constructor(useCase: IListUserGetAllUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { listId } = req.params;
    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

    const listUserGetAllRequest: IListUserGetAllRequest = {
      listId: Number(listId),
      session,
    };

    const response = await this.useCase.execute(listUserGetAllRequest);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/lists/' + listId + '/users/',
      },
      data: [
        {
          type: 'user',
          session: {
            self: URL_SERVER + '/users/',
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
