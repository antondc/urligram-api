import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserBookmarkUpdateRequest } from '@domain/user/useCases/interfaces/IUserBookmarkUpdateRequest';
import { IUserBookmarkUpdateUseCase } from '@domain/user/useCases/UserBookmarkUpdateUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserBookmarkUpdateController extends BaseController {
  useCase: IUserBookmarkUpdateUseCase;

  constructor(useCase: IUserBookmarkUpdateUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { order, saved, isPrivate, url, tags } = req.body;
    const { bookmarkId } = req.params;

    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

    const userBookmarkUpdateRequest: IUserBookmarkUpdateRequest = {
      bookmarkId: Number(bookmarkId),
      order,
      saved,
      isPrivate,
      url,
      tags,
      session,
    };

    const response = await this.useCase.execute(userBookmarkUpdateRequest);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/user/me/bookmarks/' + response?.id,
      },
      data: [
        {
          type: 'bookmark',
          id: response?.id,
          session: {
            self: URL_SERVER + '/user/me/bookmarks/' + response?.id,
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
