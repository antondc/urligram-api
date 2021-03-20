import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserBookmarkGetAllRequest } from '@domain/user/useCases/interfaces/IUserBookmarkGetAllRequest';
import { IUserBookmarkGetAllUseCase } from '@domain/user/useCases/UserBookmarkGetAllUseCase';
import { DEFAULT_PAGE_SIZE } from '@shared/constants/constants';
import { URL_SERVER } from '@shared/constants/env';
import { TokenService } from '@shared/services/TokenService';
import { BaseController } from './BaseController';

const DEFAULT_USER_BOOKMARK_GET_ALL_SORT = '-createdat';

type BookmarkGetAllPublicControllerQueryType = {
  sort: 'id' | '-id' | 'createdat' | '-createdat' | 'updatedat' | '-updatedat' | 'vote' | '-vote' | 'timesbookmarked' | '-timesbookmarked';
  page: {
    size: string;
    offset: string;
  };
  filter?: {
    tags?: string[];
  };
};

export class UserBookmarkGetAllController extends BaseController {
  useCase: IUserBookmarkGetAllUseCase;

  constructor(useCase: IUserBookmarkGetAllUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { userId } = req.params;
    const {
      sort = DEFAULT_USER_BOOKMARK_GET_ALL_SORT,
      page: { size, offset = null } = {},
      filter: { tags } = {},
    } = req.query as BookmarkGetAllPublicControllerQueryType;

    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;
    const checkedSize = Number(size) || DEFAULT_PAGE_SIZE;
    const castedOffset = Number(offset) || null;

    const userBookmarkGetAllRequest: IUserBookmarkGetAllRequest = {
      userId,
      session,
      sort,
      size: checkedSize,
      offset: castedOffset,
      filter: {
        tags,
      },
    };

    const { bookmarks, meta } = await this.useCase.execute(userBookmarkGetAllRequest);

    const formattedLinks = bookmarks.map((item) => {
      return {
        type: 'link',
        id: item.id,
        session: {
          self: URL_SERVER + '/links/' + item.id,
        },
        attributes: {
          ...item,
        },
      };
    });

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/links',
      },
      meta,
      data: formattedLinks,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
