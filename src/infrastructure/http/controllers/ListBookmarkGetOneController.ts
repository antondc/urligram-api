import { Request, Response } from 'express';

import { IListBookmarkGetOneRequest } from '@domain/list/useCases/interfaces/IListBookmarkGetOneRequest';
import { IListBookmarkGetOneUseCase } from '@domain/list/useCases/ListBookmarkGetOneUseCase';
import { User } from '@domain/user/entities/User';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListBookmarkGetOneController extends BaseController {
  useCase: IListBookmarkGetOneUseCase;

  constructor(useCase: IListBookmarkGetOneUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { listId, bookmarkId } = req.params;
    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

    const listBookmarkGetOneUseCase: IListBookmarkGetOneRequest = {
      listId: Number(listId),
      bookmarkId: Number(bookmarkId),
      session,
    };

    const response = await this.useCase.execute(listBookmarkGetOneUseCase);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/lists/' + listId + '/bookmarks/' + response?.id,
      },
      data: [
        {
          type: 'bookmarks',
          session: {
            self: URL_SERVER + '/bookmarks/' + response?.id,
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
