import { Request, Response } from 'express';

import { TokenJWT } from '@antoniodcorrea/utils';
import { User } from '@domain/user/entities/User';
import { IUserBookmarkUpdateRequest } from '@domain/user/useCases/interfaces/IUserBookmarkUpdateRequest';
import { IUserBookmarkUpdateUseCase } from '@domain/user/useCases/UserBookmarkUpdateUseCase';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { JWT_SECRET } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserBookmarkUpdateController extends BaseController {
  useCase: IUserBookmarkUpdateUseCase;

  constructor(useCase: IUserBookmarkUpdateUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { order, saved, isPublic, tags, title, notes } = req.body;
    const { bookmarkId } = req.params;

    const tokenService = new TokenJWT(JWT_SECRET);
    const session = tokenService.decodeToken<User>(req.cookies.sessionToken);

    const userBookmarkUpdateRequest: IUserBookmarkUpdateRequest = {
      bookmarkId: Number(bookmarkId),
      order,
      title,
      saved,
      isPublic,
      tags,
      session,
      notes,
    };

    const response = await this.useCase.execute(userBookmarkUpdateRequest);

    const formattedResponse = {
      links: {
        self: URL_SERVER + PATH_API_V1 + '/user/me/bookmarks/' + response?.id,
      },
      data: {
        type: 'bookmark',
        id: response?.id,
        session: {
          self: URL_SERVER + PATH_API_V1 + '/user/me/bookmarks/' + response?.id,
        },
        attributes: response,
        relationships: {},
      },
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
