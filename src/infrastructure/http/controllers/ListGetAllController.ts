import { Request, Response } from 'express';

import { IListGetAllUseCase } from '@domain/list/useCases/ListGetAllUseCase';
import { User } from '@domain/user/entities/User';
import { TokenService } from '@infrastructure/services/TokenService';
import { DEFAULT_PAGE_SIZE } from '@shared/constants/constants';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

type ListGetAllControllerQueryType = {
  sort: 'id' | '-id' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt' | 'members' | '-members';
  page: {
    size: string;
    offset: string;
  };
};

export class ListGetAllController extends BaseController {
  useCase: IListGetAllUseCase;

  constructor(useCase: IListGetAllUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { sort, page: { size, offset } = {} } = req.query as ListGetAllControllerQueryType;
    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;
    const checkedSize = Number(size) || DEFAULT_PAGE_SIZE;
    const checkedSort = sort || undefined;
    const castedOffset = Number(offset) || undefined;

    const { lists, meta } = await this.useCase.execute({ session, size: checkedSize, sort: checkedSort, offset: castedOffset });

    const formattedLists = lists.map((item) => {
      return {
        type: 'list',
        id: item.id,
        session: {
          self: URL_SERVER + '/lists/' + item.id,
        },
        attributes: {
          ...item,
        },
      };
    });

    const formattedResponse = {
      meta,
      lists: {
        self: URL_SERVER + '/lists',
      },
      data: formattedLists,
    };

    return res.status(200).send(formattedResponse);
  }
}
