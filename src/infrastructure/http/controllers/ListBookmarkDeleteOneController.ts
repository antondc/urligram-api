import { Request, Response } from 'express';

import { IListBookmarkDeleteOneRequest } from '@domain/list/useCases/interfaces/IListBookmarkDeleteOneRequest';
import { IListBookmarkDeleteOneUseCase } from '@domain/list/useCases/ListBookmarkDeleteOneUseCase';
import { User } from '@domain/user/entities/User';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { TokenService } from '@shared/services/TokenService';
import { BaseController } from './BaseController';

export class ListBookmarkDeleteOneController extends BaseController {
  useCase: IListBookmarkDeleteOneUseCase;

  constructor(useCase: IListBookmarkDeleteOneUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { listId, bookmarkId } = req.params;
    const tokenService = new TokenService();
    const session = tokenService.decodeToken<User>(req.cookies.sessionToken);

    const listBookmarkDeleteOneRequest: IListBookmarkDeleteOneRequest = {
      listId: Number(listId),
      bookmarkId: Number(bookmarkId),
      session,
    };

    const response = await this.useCase.execute(listBookmarkDeleteOneRequest);

    const formattedResponse = {
      links: {
        self: URL_SERVER + PATH_API_V1 + '/lists/' + listId + '/bookmarks/' + response.bookmarkId,
      },
      data: {
        type: 'bookmark',
        session: {
          self: URL_SERVER + PATH_API_V1 + '/bookmarks/' + response.bookmarkId,
        },
        attributes: response,
        relationships: {},
      },
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
