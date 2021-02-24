import { Request, Response } from 'express';

import { IListBookmarkGetAllRequest } from '@domain/list/useCases/interfaces/IListBookmarkGetAllRequest';
import { IListBookmarkGetAllResponse } from '@domain/list/useCases/interfaces/IListBookmarkGetAllResponse';
import { IListBookmarkGetAllUseCase } from '@domain/list/useCases/ListBookmarkGetAllUseCase';
import { User } from '@domain/user/entities/User';
import { TokenService } from '@infrastructure/services/TokenService';
import { URLWrapper } from '@infrastructure/services/UrlWrapper';
import { DEFAULT_PAGE_SIZE } from '@shared/constants/constants';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

const DEFAULT_LIST_BOOKMARK_GET_ALL_SORT = '-vote';

type ListBookmarkGetAllControllerQueryType = {
  sort: 'id' | '-id' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt' | 'vote' | '-vote' | 'timesbookmarked' | 'timesbookmarked';
  page: {
    size: string;
    offset: string;
  };
};

export class ListBookmarkGetAllController extends BaseController {
  useCase: IListBookmarkGetAllUseCase;

  constructor(useCase: IListBookmarkGetAllUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { sort = DEFAULT_LIST_BOOKMARK_GET_ALL_SORT, page: { size, offset } = {} } = req.query as ListBookmarkGetAllControllerQueryType;
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
    };

    const { bookmarks, meta }: IListBookmarkGetAllResponse = await this.useCase.execute(listBookmarkGetAllRequest);

    const formattedBookmarks = bookmarks.map((item) => {
      const urlWrapper = new URLWrapper(item.url);
      const url = urlWrapper.getUrl();

      return {
        type: 'bookmark',
        id: item.id,
        session: {
          self: URL_SERVER + '/bookmarks/' + item.id,
        },
        attributes: {
          ...item,
          url,
        },
      };
    });

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/lists/' + listId + '/bookmarks/',
      },
      meta,
      data: formattedBookmarks,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
