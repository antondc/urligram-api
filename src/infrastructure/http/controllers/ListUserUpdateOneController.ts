import { Request, Response } from 'express';

import { IListUserUpdateOneRequest } from '@domain/list/useCases/interfaces/IListUserUpdateOneRequest';
import { IListUserUpdateOneUseCase } from '@domain/list/useCases/ListUserUpdateOneUseCase';
import { User } from '@domain/user/entities/User';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListUserUpdateOneController extends BaseController {
  useCase: IListUserUpdateOneUseCase;

  constructor(useCase: IListUserUpdateOneUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { listId, userId } = req.params;
    const { userRole } = req.body;
    const tokenService = new TokenService();
    const session = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const listUserUpdateOneDTO: IListUserUpdateOneRequest = {
      listId: Number(listId),
      userId,
      userRole,
      session,
    };

    const response = await this.useCase.execute(listUserUpdateOneDTO);

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
