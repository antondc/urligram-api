import { Request, Response } from 'express';

import { TokenJWT } from '@antoniodcorrea/utils-backend';
import { User } from '@domain/user/entities/User';
import { IUserBookmarkImportRequest } from '@domain/user/useCases/interfaces/IUserBookmarkImportRequest';
import { IUserBookmarkImportUseCase } from '@domain/user/useCases/UserBookmarkImportUseCase';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { JWT_SECRET } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserBookmarkImportController extends BaseController {
  useCase: IUserBookmarkImportUseCase;

  constructor(useCase: IUserBookmarkImportUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    // const { importFile } = req.body;

    const tokenService = new TokenJWT(JWT_SECRET);
    const session = tokenService.decodeToken<User>(req.cookies.sessionToken);

    // Call parse import file service here

    const userBookmarkImportRequest: IUserBookmarkImportRequest = {
      content: {},
      session,
    };

    const bookmarks = await this.useCase.execute(userBookmarkImportRequest);

    const formattedBookmarks = bookmarks.map((item) => {
      return {
        type: 'link',
        id: item.id,
        session: {
          self: URL_SERVER + PATH_API_V1 + '/links/' + item.id,
        },
        attributes: {
          ...item,
        },
      };
    });

    const formattedResponse = {
      links: {
        self: URL_SERVER + PATH_API_V1 + '/user/me/bookmarks/import',
      },
      data: formattedBookmarks,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
