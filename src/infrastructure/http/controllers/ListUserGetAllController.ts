import { TokenJWT } from '@antoniodcorrea/utils';
import { Request, Response } from 'express';

import { IListUserGetAllRequest } from '@domain/list/useCases/interfaces/IListUserGetAllRequest';
import { IListUserGetAllUseCase } from '@domain/list/useCases/ListUserGetAllUseCase';
import { User } from '@domain/user/entities/User';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { JWT_SECRET } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListUserGetAllController extends BaseController {
  useCase: IListUserGetAllUseCase;

  constructor(useCase: IListUserGetAllUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { listId } = req.params;
    const tokenService = new TokenJWT(JWT_SECRET);
    const session = tokenService.decodeToken<User>(req.cookies.sessionToken);

    const listUserGetAllRequest: IListUserGetAllRequest = {
      listId: Number(listId),
      session,
    };

    const response = await this.useCase.execute(listUserGetAllRequest);

    const formattedResponse = {
      links: {
        self: URL_SERVER + PATH_API_V1 + '/lists/' + listId + '/users/',
      },
      data: [
        {
          type: 'user',
          session: {
            self: URL_SERVER + PATH_API_V1 + '/users/',
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
