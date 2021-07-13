import { Request, Response } from 'express';

import { IListBookmarkGetAllRequest } from '@domain/list/useCases/interfaces/IListBookmarkGetAllRequest';
import { IListBookmarkGetAllResponse } from '@domain/list/useCases/interfaces/IListBookmarkGetAllResponse';
import { IListBookmarkGetAllUseCase } from '@domain/list/useCases/ListBookmarkGetAllUseCase';
import { User } from '@domain/user/entities/User';
import { DEFAULT_PAGE_SIZE } from '@shared/constants/constants';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { TokenService } from '@shared/services/TokenService';
import { BaseController } from './BaseController';

const DEFAULT_LIST_BOOKMARK_GET_ALL_SORT = '-vote';

type ListBookmarkGetAllControllerQueryType = {
  sort: 'id' | '-id' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt' | 'vote' | '-vote' | 'timesbookmarked' | 'timesbookmarked';
  page: {
    size: string;
    offset: string;
  };
  filter: {
    tags?: string[];
  };
};

export class ListBookmarkGetAllController extends BaseController {
  useCase: IListBookmarkGetAllUseCase;

  constructor(useCase: IListBookmarkGetAllUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const {
      sort = DEFAULT_LIST_BOOKMARK_GET_ALL_SORT,
      page: { size, offset } = {},
      filter: { tags } = {},
    } = req.query as ListBookmarkGetAllControllerQueryType;
    const checkedSize = Number(size) || DEFAULT_PAGE_SIZE;
    const checkedAfter = Number(offset) || undefined;
    const { listId } = req.params;
    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

    const listBookmarkGetAllRequest: IListBookmarkGetAllRequest = {
      listId: Number(listId),
      session,
      sort,
      size: checkedSize,
      offset: checkedAfter,
      filter: {
        tags,
      },
    };

    const { bookmarks, meta }: IListBookmarkGetAllResponse = await this.useCase.execute(listBookmarkGetAllRequest);

    const formattedBookmarks = bookmarks.map((item) => {
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
        self: URL_SERVER + PATH_API_V1 + '/lists/' + listId + '/bookmarks/',
      },
      meta,
      data: formattedBookmarks,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
