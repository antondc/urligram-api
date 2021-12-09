import { Request, Response } from 'express';

import { IBookmarkListGetAllUseCase } from '@domain/bookmark/useCases/BookmarkListGetAllUseCase';
import { IBookmarkListGetAllRequest } from '@domain/bookmark/useCases/interfaces/IBookmarkListGetAllRequest';
import { User } from '@domain/user/entities/User';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { TokenService } from '@shared/services/TokenService';
import { BaseController } from './BaseController';

export class BookmarkListGetAllController extends BaseController {
  useCase: IBookmarkListGetAllUseCase;

  constructor(useCase: IBookmarkListGetAllUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { bookmarkId } = req.params;
    const tokenService = new TokenService();
    const session = tokenService.decodeToken<User>(req.cookies.sessionToken);

    const bookmarkListGetAllRequest: IBookmarkListGetAllRequest = {
      bookmarkId: Number(bookmarkId),
      session,
    };

    const response = await this.useCase.execute(bookmarkListGetAllRequest);

    const formattedLinks = response.map((item) => {
      return {
        type: 'tag',
        id: item.id,
        session: {
          self: URL_SERVER + PATH_API_V1 + '/lists/' + item.id,
        },
        attributes: item,
      };
    });

    const formattedResponse = {
      links: {
        self: URL_SERVER + PATH_API_V1 + '/bookmarks/' + bookmarkId + '/lists',
      },
      data: formattedLinks,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
