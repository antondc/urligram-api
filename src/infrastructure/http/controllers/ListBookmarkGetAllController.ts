import { Request, Response } from 'express';

import { IListBookmarkGetAllRequest } from '@domain/list/useCases/interfaces/IListBookmarkGetAllRequest';
import { IListBookmarkGetAllResponse } from '@domain/list/useCases/interfaces/IListBookmarkGetAllResponse';
import { IListBookmarkGetAllUseCase } from '@domain/list/useCases/ListBookmarkGetAllUseCase';
import { User } from '@domain/user/entities/User';
import { TokenService } from '@infrastructure/services/TokenService';
import { URLWrapper } from '@infrastructure/services/UrlWrapper';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListBookmarkGetAllController extends BaseController {
  useCase: IListBookmarkGetAllUseCase;

  constructor(useCase: IListBookmarkGetAllUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { listId } = req.params;
    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

    const listBookmarkGetAllRequest: IListBookmarkGetAllRequest = {
      listId: Number(listId),
      session,
    };

    const response: IListBookmarkGetAllResponse = await this.useCase.execute(listBookmarkGetAllRequest);

    const formattedBookmarks = response.map((item) => {
      const urlWrapper = new URLWrapper(item.url);
      const url = urlWrapper.getUrl();

      return {
        type: 'bookmark',
        id: item.id,
        session: {
          self: URL_SERVER + '/bookmarks/' + item.id,
        },
        attributes: {
          ...item,
          url,
        },
      };
    });

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/lists/' + listId + '/bookmarks/',
      },
      data: formattedBookmarks,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
