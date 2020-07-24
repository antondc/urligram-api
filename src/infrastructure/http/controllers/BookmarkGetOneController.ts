import { Request, Response } from 'express';

import { IBookmarkGetOneUseCase } from '@domain/bookmark/useCases/BookmarkGetOneUseCase';
import { IBookmarkGetOneRequest } from '@domain/bookmark/useCases/interfaces/IBookmarkGetOneRequest';
import { User } from '@domain/user/entities/User';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class BookmarkGetOneController extends BaseController {
  useCase: IBookmarkGetOneUseCase;

  constructor(useCase: IBookmarkGetOneUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { bookmarkId } = req.params;
    const tokenService = new TokenService();
    const session = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const bookmarkGetOneRequest: IBookmarkGetOneRequest = {
      bookmarkId: Number(bookmarkId),
      session,
    };

    const response = await this.useCase.execute(bookmarkGetOneRequest);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/bookmarks',
      },
      data: [
        {
          type: 'bookmark',
          id: response.id,
          session: {
            self: URL_SERVER + '/bookmarks/' + response.id,
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
