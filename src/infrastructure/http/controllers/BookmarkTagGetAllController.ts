import { Request, Response } from 'express';

import { IBookmarkTagGetAllUseCase } from '@domain/bookmark/useCases/BookmarkTagGetAllUseCase';
import { IBookmarkTagGetAllRequest } from '@domain/bookmark/useCases/interfaces/IBookmarkTagGetAllRequest';
import { User } from '@domain/user/entities/User';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { TokenService } from '@shared/services/TokenService';
import { BaseController } from './BaseController';

export class BookmarkTagGetAllController extends BaseController {
  useCase: IBookmarkTagGetAllUseCase;

  constructor(useCase: IBookmarkTagGetAllUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { bookmarkId } = req.params;
    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

    const bookmarkTagGetAllRequest: IBookmarkTagGetAllRequest = {
      bookmarkId: Number(bookmarkId),
      session,
    };

    const response = await this.useCase.execute(bookmarkTagGetAllRequest);

    const formattedLinks = response.map((item) => {
      return {
        type: 'tag',
        id: item.id,
        session: {
          self: URL_SERVER + PATH_API_V1 + '/tags/' + item.id,
        },
        attributes: item,
      };
    });

    const formattedResponse = {
      links: {
        self: URL_SERVER + PATH_API_V1 + '/bookmarks/' + bookmarkId + '/tags',
      },
      data: formattedLinks,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
