import { TokenJWT } from '@antoniodcorrea/utils';
import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserBookmarkGetAllRequest } from '@domain/user/useCases/interfaces/IUserBookmarkGetAllRequest';
import { IUserBookmarkGetAllUseCase } from '@domain/user/useCases/UserBookmarkGetAllUseCase';
import { DEFAULT_PAGE_SIZE } from '@shared/constants/constants';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { JWT_SECRET } from '@shared/constants/env';
import { BaseController } from './BaseController';

const DEFAULT_USER_BOOKMARK_GET_ALL_SORT = '-createdAt';

type BookmarkGetAllPublicControllerQueryType = {
  sort: 'id' | '-id' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt' | 'vote' | '-vote' | 'timesbookmarked' | '-timesbookmarked';
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

    const tokenService = new TokenJWT(JWT_SECRET);
    const session = tokenService.decodeToken<User>(req.cookies.sessionToken);
    const checkedSize = Number(size) || DEFAULT_PAGE_SIZE;
    const castedOffset = Number(offset) || null;
    const userOrSession = userId === 'me' ? session?.id : userId;

    const userBookmarkGetAllRequest: IUserBookmarkGetAllRequest = {
      userId: userOrSession,
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
          self: URL_SERVER + PATH_API_V1 + '/links/' + item.id,
        },
        attributes: {
          ...item,
        },
      };
    });

    const formattedResponse = {
      links: {
        self: URL_SERVER + PATH_API_V1 + '/links',
      },
      meta,
      data: formattedLinks,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
