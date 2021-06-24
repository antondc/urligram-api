import { Request, Response } from 'express';

import { ITagBookmarkGetAllPublicRequest } from '@domain/tag/useCases/interfaces/ITagBookmarkGetAllPublicRequest';
import { ITagBookmarkGetAllPublicUseCase } from '@domain/tag/useCases/TagBookmarkGetAllPublicUseCase';
import { User } from '@domain/user/entities/User';
import { URL_SERVER } from '@shared/constants/env';
import { TokenService } from '@shared/services/TokenService';
import { BaseController } from './BaseController';

export class TagBookmarkGetAllPublicController extends BaseController {
  useCase: ITagBookmarkGetAllPublicUseCase;

  constructor(useCase: ITagBookmarkGetAllPublicUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { tagId } = req.params;
    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

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
          self: URL_SERVER + '/bookmarks/' + item.id,
        },
        attributes: {
          ...item,
        },
      };
    });

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/tags/' + tagId + '/bookmarks/',
      },
      data: formattedBookmarks,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
