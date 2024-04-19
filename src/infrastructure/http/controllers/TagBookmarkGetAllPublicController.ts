import { Request, Response } from 'express';

import { TokenJWT } from '@antoniodcorrea/utils-backend';
import { ITagBookmarkGetAllPublicRequest } from '@domain/tag/useCases/interfaces/ITagBookmarkGetAllPublicRequest';
import { ITagBookmarkGetAllPublicUseCase } from '@domain/tag/useCases/TagBookmarkGetAllPublicUseCase';
import { User } from '@domain/user/entities/User';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { JWT_SECRET } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class TagBookmarkGetAllPublicController extends BaseController {
  useCase: ITagBookmarkGetAllPublicUseCase;

  constructor(useCase: ITagBookmarkGetAllPublicUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { tagId } = req.params;
    const tokenService = new TokenJWT(JWT_SECRET);
    const session = tokenService.decodeToken<User>(req.cookies.sessionToken);

    const tagBookmarkGetAllPublic: ITagBookmarkGetAllPublicRequest = {
      session,
      tagId: Number(tagId),
    };

    const response = await this.useCase.execute(tagBookmarkGetAllPublic);

    const formattedBookmarks = response.map((item) => {
      return {
        type: 'bookmark',
        id: item.id,
        session: {
          self: URL_SERVER + PATH_API_V1 + '/bookmarks/' + item.id,
        },
        attributes: {
          ...item,
        },
      };
    });

    const formattedResponse = {
      links: {
        self: URL_SERVER + PATH_API_V1 + '/tags/' + tagId + '/bookmarks/',
      },
      data: formattedBookmarks,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
