import { Request, Response } from 'express';

import { TokenJWT } from '@antoniodcorrea/utils-backend';
import { IListBookmarkUserGetAllRequest } from '@domain/list/useCases/interfaces/IListBookmarkUserGetAllRequest';
import { IListBookmarkUserGetAllUseCase } from '@domain/list/useCases/ListBookmarkUserGetAllUseCase';
import { User } from '@domain/user/entities/User';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { JWT_SECRET } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListBookmarkUserGetAllController extends BaseController {
  useCase: IListBookmarkUserGetAllUseCase;

  constructor(useCase: IListBookmarkUserGetAllUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const tokenService = new TokenJWT(JWT_SECRET);
    const session = tokenService.decodeToken<User>(req.cookies.sessionToken);

    const listBookmarkGetOneUseCase: IListBookmarkUserGetAllRequest = {
      session,
    };

    const listNotifications = await this.useCase.execute(listBookmarkGetOneUseCase);

    const formattedListNotifications = listNotifications.map((item) => {
      return {
        type: 'listNotification',
        id: item.id,
        session: {
          self: URL_SERVER + PATH_API_V1 + '/bookmarks/users/me',
        },
        attributes: {
          ...item,
        },
      };
    });

    const formattedResponse = {
      links: {
        self: URL_SERVER + PATH_API_V1 + '/bookmarks/users/me',
      },
      data: formattedListNotifications,
    };

    return res.status(200).send(formattedResponse);
  }
}
