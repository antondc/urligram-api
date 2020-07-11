import { Request, Response } from 'express';

import { IListUserCreateUseCase } from '@domain/list/useCases/ListUserCreateUseCase';
import { User } from '@domain/user/entities/User';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListUserCreateController extends BaseController {
  useCase: IListUserCreateUseCase;

  constructor(useCase: IListUserCreateUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { id } = req.params;
    const tokenService = new TokenService();
    const token = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const linkUserCreateRequestDTO = {
      listId: Number(id),
      sessionId: token?.id,
    };

    const response = await this.useCase.execute(linkUserCreateRequestDTO);

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
