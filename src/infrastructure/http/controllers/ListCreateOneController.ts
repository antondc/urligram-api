import { Request, Response } from 'express';

import { TokenJWT } from '@antoniodcorrea/utils';
import { IListCreateOneRequest } from '@domain/list/useCases/interfaces/IListCreateOneRequest';
import { IListCreateOneUseCase } from '@domain/list/useCases/ListCreateOneUseCase';
import { User } from '@domain/user/entities/User';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { JWT_SECRET } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListCreateOneController extends BaseController {
  useCase: IListCreateOneUseCase;

  constructor(useCase: IListCreateOneUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { listName, listDescription, listIsPublic } = req.body;

    const tokenService = new TokenJWT(JWT_SECRET);
    const session = tokenService.decodeToken<User>(req.cookies.sessionToken);

    const listCreateOneRequest: IListCreateOneRequest = {
      session,
      listName,
      listDescription,
      listIsPublic,
    };

    const response = await this.useCase.execute(listCreateOneRequest);

    const formattedResponse = {
      lists: {
        self: URL_SERVER + PATH_API_V1 + '/lists/',
      },
      data: {
        type: 'list',
        id: response?.id,
        session: {
          self: URL_SERVER + PATH_API_V1 + '/lists/' + response?.id,
        },
        attributes: response,
        relationships: {},
      },
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
