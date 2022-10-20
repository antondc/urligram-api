import { TokenJWT } from '@antoniodcorrea/utils';
import { Request, Response } from 'express';

import { IBookmarkGetOneByLinkUserUseCase } from '@domain/bookmark/useCases/BookmarkGetOneByLinkUserUseCase';
import { IBookmarkGetOneByLinkUserRequest } from '@domain/bookmark/useCases/interfaces/IBookmarkGetOneByLinkUserRequest';
import { User } from '@domain/user/entities/User';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { JWT_SECRET } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class BookmarkGetByLinkIdAndUserIdController extends BaseController {
  useCase: IBookmarkGetOneByLinkUserUseCase;

  constructor(useCase: IBookmarkGetOneByLinkUserUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { linkId } = req.params;
    const tokenService = new TokenJWT(JWT_SECRET);
    const session = tokenService.decodeToken<User>(req.cookies.sessionToken);

    const bookmarkGetOneByLinkUserRequest: IBookmarkGetOneByLinkUserRequest = {
      linkId: Number(linkId),
      session,
    };

    const response = await this.useCase.execute(bookmarkGetOneByLinkUserRequest);

    const formattedResponse = {
      links: {
        self: URL_SERVER + PATH_API_V1 + '/bookmarks',
      },
      data: {
        type: 'bookmark',
        id: response.id,
        session: {
          self: `${URL_SERVER}${PATH_API_V1}/bookmarks/${response.id}}`,
        },
        attributes: response,
        relationships: {},
      },
    };

    return res.status(200).send(formattedResponse);
  }
}
