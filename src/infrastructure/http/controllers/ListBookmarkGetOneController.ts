import { Request, Response } from 'express';

import { TokenJWT } from '@antoniodcorrea/utils-backend';
import { IListBookmarkGetOneRequest } from '@domain/list/useCases/interfaces/IListBookmarkGetOneRequest';
import { IListBookmarkGetOneUseCase } from '@domain/list/useCases/ListBookmarkGetOneUseCase';
import { User } from '@domain/user/entities/User';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { JWT_SECRET } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListBookmarkGetOneController extends BaseController {
  useCase: IListBookmarkGetOneUseCase;

  constructor(useCase: IListBookmarkGetOneUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { listId, bookmarkId } = req.params;
    const tokenService = new TokenJWT(JWT_SECRET);
    const session = tokenService.decodeToken<User>(req.cookies.sessionToken);

    const listBookmarkGetOneUseCase: IListBookmarkGetOneRequest = {
      listId: Number(listId),
      bookmarkId: Number(bookmarkId),
      session,
    };

    const response = await this.useCase.execute(listBookmarkGetOneUseCase);

    const formattedResponse = {
      links: {
        self: URL_SERVER + PATH_API_V1 + '/lists/' + listId + '/bookmarks/' + response?.id,
      },
      data: [
        {
          type: 'bookmarks',
          session: {
            self: URL_SERVER + PATH_API_V1 + '/bookmarks/' + response?.id,
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
