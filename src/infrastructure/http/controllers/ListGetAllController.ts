import { TokenJWT } from '@antoniodcorrea/utils';
import { Request, Response } from 'express';

import { IListGetAllUseCase } from '@domain/list/useCases/ListGetAllUseCase';
import { User } from '@domain/user/entities/User';
import { DEFAULT_PAGE_SIZE } from '@shared/constants/constants';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { JWT_SECRET } from '@shared/constants/env';
import { BaseController } from './BaseController';

const DEFAULT_LIST_GET_ALL_SORT = '-createdAt';

type ListGetAllControllerQueryType = {
  sort: 'id' | '-id' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt' | 'members' | '-members' | 'bookmarks' | '-bookmarks';
  page: {
    size: string;
    offset: string;
  };
  filter: {
    tags?: string;
  };
};

export class ListGetAllController extends BaseController {
  useCase: IListGetAllUseCase;

  constructor(useCase: IListGetAllUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { sort = DEFAULT_LIST_GET_ALL_SORT, page: { size, offset } = {}, filter: { tags } = {} } = req.query as ListGetAllControllerQueryType;
    const tokenService = new TokenJWT(JWT_SECRET);
    const session = tokenService.decodeToken<User>(req.cookies.sessionToken);
    const checkedSize = Number(size) || DEFAULT_PAGE_SIZE;
    const checkedSort = sort || undefined;
    const castedOffset = Number(offset) || undefined;

    const { lists, meta } = await this.useCase.execute({
      session,
      size: checkedSize,
      sort: checkedSort,
      offset: castedOffset,
      filter: {
        tags,
      },
    });

    const formattedLists = lists.map((item) => {
      return {
        type: 'list',
        id: item.id,
        session: {
          self: URL_SERVER + PATH_API_V1 + '/lists/' + item.id,
        },
        attributes: {
          ...item,
        },
      };
    });

    const formattedResponse = {
      meta,
      lists: {
        self: URL_SERVER + PATH_API_V1 + '/lists',
      },
      data: formattedLists,
    };

    return res.status(200).send(formattedResponse);
  }
}
