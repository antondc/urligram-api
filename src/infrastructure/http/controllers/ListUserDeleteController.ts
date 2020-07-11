import { Request, Response } from 'express';

import { IListUserDeleteUseCase } from '@domain/list/useCases/ListUserDeleteUseCase';
import { User } from '@domain/user/entities/User';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListUserDeleteController extends BaseController {
  useCase: IListUserDeleteUseCase;

  constructor(useCase: IListUserDeleteUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { id, userId } = req.params;
    const tokenService = new TokenService();
    const token = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const linkUserDeleteRequestDTO = {
      listId: Number(id),
      userId,
      sessionId: token?.id,
    };

    const response = await this.useCase.execute(linkUserDeleteRequestDTO);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/lists/' + response.listId,
      },
      data: [
        {
          type: 'list',
          session: {
            self: URL_SERVER + '/lists/' + response.listId,
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
