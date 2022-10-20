import { TokenJWT } from '@antoniodcorrea/utils';
import { Request, Response } from 'express';

import { IListBookmarkUserUpsertOneRequest } from '@domain/list/useCases/interfaces/IListBookmarkUserUpsertOneRequest';
import { IListBookmarkUserUpsertOneUseCase } from '@domain/list/useCases/ListBookmarkUserUpsertOneUseCase';
import { User } from '@domain/user/entities/User';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { JWT_SECRET } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListBookmarkUserUpsertOneController extends BaseController {
  useCase: IListBookmarkUserUpsertOneUseCase;

  constructor(useCase: IListBookmarkUserUpsertOneUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { listId, bookmarkId } = req.params;
    const { viewPending } = req.body;
    const tokenService = new TokenJWT(JWT_SECRET);
    const session = tokenService.decodeToken<User>(req.cookies.sessionToken);

    const listBookmarkGetOneUseCase: IListBookmarkUserUpsertOneRequest = {
      listId: Number(listId),
      bookmarkId: Number(bookmarkId),
      session,
      viewPending,
    };

    const response = await this.useCase.execute(listBookmarkGetOneUseCase);

    const formattedResponse = {
      links: {
        self: URL_SERVER + PATH_API_V1 + '/lists/' + listId + '/bookmarks/' + response?.bookmarkId + '/users/' + response?.userId,
      },
      data: {
        type: 'bookmarks',
        session: {
          self: URL_SERVER + PATH_API_V1 + '/lists/' + listId + '/bookmarks/' + response?.bookmarkId + '/users/' + response?.userId,
        },
        attributes: response,
        relationships: {},
      },
    };

    return res.status(200).send(formattedResponse);
  }
}
