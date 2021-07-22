import { Request, Response } from 'express';

import { IListBookmarkUserUpsertOneRequest } from '@domain/list/useCases/interfaces/IListBookmarkUserUpsertOneRequest';
import { IListBookmarkUserUpsertOneUseCase } from '@domain/list/useCases/ListBookmarkUserUpsertOneUseCase';
import { User } from '@domain/user/entities/User';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { TokenService } from '@shared/services/TokenService';
import { BaseController } from './BaseController';

export class ListBookmarkUserUpsertOneController extends BaseController {
  useCase: IListBookmarkUserUpsertOneUseCase;

  constructor(useCase: IListBookmarkUserUpsertOneUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { listId, bookmarkId, userId } = req.params;
    const { pending } = req.body;
    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

    const listBookmarkGetOneUseCase: IListBookmarkUserUpsertOneRequest = {
      listId: Number(listId),
      bookmarkId: Number(bookmarkId),
      userId,
      session,
      pending
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
