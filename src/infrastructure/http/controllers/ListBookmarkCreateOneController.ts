import { Request, Response } from 'express';

import { TokenJWT } from '@antoniodcorrea/utils-backend';
import { IListBookmarkCreateOneRequest } from '@domain/list/useCases/interfaces/IListBookmarkCreateOneRequest';
import { IListBookmarkCreateOneUseCase } from '@domain/list/useCases/ListBookmarkCreateOneUseCase';
import { User } from '@domain/user/entities/User';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { JWT_SECRET } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListBookmarkCreateOneController extends BaseController {
  useCase: IListBookmarkCreateOneUseCase;

  constructor(useCase: IListBookmarkCreateOneUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { listId, bookmarkId } = req.params;
    const tokenService = new TokenJWT(JWT_SECRET);
    const session = tokenService.decodeToken<User>(req.cookies.sessionToken);

    const listBookmarkCreateOneRequest: IListBookmarkCreateOneRequest = {
      listId: Number(listId),
      bookmarkId: Number(bookmarkId),
      session,
    };

    const response = await this.useCase.execute(listBookmarkCreateOneRequest);

    const formattedResponse = {
      links: {
        self: URL_SERVER + PATH_API_V1 + '/lists/' + listId + '/bookmarks/' + response.id,
      },
      data: {
        type: 'bookmark',
        session: {
          self: URL_SERVER + PATH_API_V1 + '/bookmarks/' + response.id,
        },
        attributes: response,
        relationships: {},
      },
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
