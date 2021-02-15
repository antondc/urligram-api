import { Request, Response } from 'express';

import { IBookmarkGetAllPublicUseCase } from '@domain/bookmark/useCases/BookmarkGetAllPublicUseCase';
import { IBookmarkGetAllPublicRequest } from '@domain/bookmark/useCases/interfaces/IBookmarkGetAllPublicRequest';
import { User } from '@domain/user/entities/User';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

type BookmarkGetAllPublicControllerQueryType = {
  sort: 'id' | '-id' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt';
  page: {
    size: string;
    offset: string;
  };
};

export class BookmarkGetAllPublicController extends BaseController {
  useCase: IBookmarkGetAllPublicUseCase;

  constructor(useCase: IBookmarkGetAllPublicUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { sort, page: { size, offset } = {} } = req.query as BookmarkGetAllPublicControllerQueryType;

    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;
    const checkedSize = Number(size) || undefined;
    const checkedAfter = Number(offset) || undefined;

    const bookmarkGetAllPublicRequest: IBookmarkGetAllPublicRequest = {
      session,
      sort,
      size: checkedSize,
      offset: checkedAfter,
    };

    const { bookmarks, meta } = await this.useCase.execute(bookmarkGetAllPublicRequest);

    const formattedBookmarks = bookmarks.map((item) => {
      return {
        type: 'bookmark',
        id: item.id,
        links: {
          self: URL_SERVER + '/bookmarks/' + item.id,
        },
        attributes: item,
      };
    });

    const formattedResponse = {
      meta,
      Bookmarks: {
        self: URL_SERVER + '/bookmarks',
      },
      data: formattedBookmarks,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
