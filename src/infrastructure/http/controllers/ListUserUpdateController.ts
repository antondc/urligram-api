import { Request, Response } from 'express';

import { IListUserUpdateUseCase } from '@domain/list/useCases/ListUserUpdateUseCase';
import { User } from '@domain/user/entities/User';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListUserUpdateController extends BaseController {
  useCase: IListUserUpdateUseCase;

  constructor(useCase: IListUserUpdateUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { id, userId } = req.params;
    const { newRole } = req.body;
    const tokenService = new TokenService();
    const token = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const listUserUpdateRequestDTO = {
      listId: Number(id),
      userId,
      sessionId: token?.id,
      newRole,
    };

    const response = await this.useCase.execute(listUserUpdateRequestDTO);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/lists/' + id + '/users/' + response.id,
      },
      data: [
        {
          type: 'user',
          session: {
            self: URL_SERVER + '/users/' + response.id,
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
