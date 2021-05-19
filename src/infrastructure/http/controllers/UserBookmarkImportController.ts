import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserBookmarkImportRequest } from '@domain/user/useCases/interfaces/IUserBookmarkImportRequest';
import { IUserBookmarkImportUseCase } from '@domain/user/useCases/UserBookmarkImportUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { TokenService } from '@shared/services/TokenService';
import { BaseController } from './BaseController';

export class UserBookmarkImportController extends BaseController {
  useCase: IUserBookmarkImportUseCase;

  constructor(useCase: IUserBookmarkImportUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { importFile } = req.body;

    console.log('=======');
    console.log('importFile:');
    console.log(JSON.stringify(importFile, null, 4));
    console.log('=======');

    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

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
          self: URL_SERVER + '/links/' + item.id,
        },
        attributes: {
          ...item,
        },
      };
    });

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/user/me/bookmarks/import',
      },
      data: formattedBookmarks,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
