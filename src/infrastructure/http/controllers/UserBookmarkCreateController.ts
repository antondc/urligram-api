import { Request, Response } from 'express';

import { TokenJWT } from '@antoniodcorrea/utils';
import { User } from '@domain/user/entities/User';
import { IUserBookmarkCreateRequest } from '@domain/user/useCases/interfaces/IUserBookmarkCreateRequest';
import { IUserBookmarkCreateUseCase } from '@domain/user/useCases/UserBookmarkCreateUseCase';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { JWT_SECRET } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserBookmarkCreateController extends BaseController {
  useCase: IUserBookmarkCreateUseCase;

  constructor(useCase: IUserBookmarkCreateUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { title, saved, isPublic, url, tags, notes } = req.body;
    const tokenService = new TokenJWT(JWT_SECRET);
    const session = tokenService.decodeToken<User>(req.cookies.sessionToken);

    const linkCreateRequest: IUserBookmarkCreateRequest = {
      title,
      saved,
      isPublic,
      url,
      tags,
      notes,
      session,
    };

    const response = await this.useCase.execute(linkCreateRequest);

    const formattedResponse = {
      links: {
        self: URL_SERVER + PATH_API_V1 + '/user/me/bookmarks/' + response.id,
      },
      data: {
        type: 'bookmark',
        id: response?.id,
        session: {
          self: URL_SERVER + PATH_API_V1 + '/user/me/bookmarks/' + response.id,
        },
        attributes: response,
        relationships: {},
      },
      included: [],
    };

    return res.status(201).send(formattedResponse);
  }
}
