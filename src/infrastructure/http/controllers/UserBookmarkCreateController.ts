import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserBookmarkCreateRequest } from '@domain/user/useCases/interfaces/IUserBookmarkCreateRequest';
import { IUserBookmarkCreateUseCase } from '@domain/user/useCases/UserBookmarkCreateUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserBookmarkCreateController extends BaseController {
  useCase: IUserBookmarkCreateUseCase;

  constructor(useCase: IUserBookmarkCreateUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { title, vote, saved, isPrivate, url, tags } = req.body;
    const tokenService = new TokenService();
    const session = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const linkCreateRequest: IUserBookmarkCreateRequest = {
      title,
      vote,
      saved,
      isPrivate,
      url,
      tags,
      session,
    };

    const response = await this.useCase.execute(linkCreateRequest);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/user/me/bookmarks/' + response.id,
      },
      data: [
        {
          type: 'bookmark',
          id: response?.id,
          session: {
            self: URL_SERVER + '/user/me/bookmarks/' + response.id,
          },
          attributes: response,
          relationships: {},
        },
      ],
      included: [],
    };

    return res.status(201).send(formattedResponse);
  }
}
