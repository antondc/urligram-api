import { Request, Response } from 'express';

import { IBookmarkGetAllPublicUseCase } from '@domain/bookmark/useCases/BookmarkGetAllPublicUseCase';
import { IBookmarkGetAllPublicRequest } from '@domain/bookmark/useCases/interfaces/IBookmarkGetAllPublicRequest';
import { User } from '@domain/user/entities/User';
import { DEFAULT_PAGE_SIZE } from '@shared/constants/constants';
import { URL_SERVER } from '@shared/constants/env';
import { TokenService } from '@shared/services/TokenService';
import { BaseController } from './BaseController';

const DEFAULT_SORT = '-createdAt';

type BookmarkGetAllPublicControllerQueryType = {
  sort: 'id' | '-id' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt';
  page: {
    size: string;
    offset: string;
  };
  filter?: {
    tags?: string[];
  };
};

export class BookmarkGetAllPublicController extends BaseController {
  useCase: IBookmarkGetAllPublicUseCase;

  constructor(useCase: IBookmarkGetAllPublicUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { sort = DEFAULT_SORT, page: { size, offset } = {}, filter: { tags } = {} } = req.query as BookmarkGetAllPublicControllerQueryType;

    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;
    const checkedSize = Number(size) || DEFAULT_PAGE_SIZE;
    const checkedAfter = Number(offset) || undefined;

    const bookmarkGetAllPublicRequest: IBookmarkGetAllPublicRequest = {
      session,
      sort,
      size: checkedSize,
      offset: checkedAfter,
      filter: {
        tags,
      },
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
