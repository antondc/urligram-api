import { Request, Response } from 'express';

import { IListSimilarGetAllUseCase } from '@domain/list/useCases/ListSimilarGetAllUseCase';
import { User } from '@domain/user/entities/User';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { TokenService } from '@shared/services/TokenService';
import { BaseController } from './BaseController';

type ListSimilarGetAllControllerQueryType = {
  sort: 'id' | '-id' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt' | 'members' | '-members';
  page: {
    size: string;
    offset: string;
  };
};

export class ListSimilarGetAllController extends BaseController {
  useCase: IListSimilarGetAllUseCase;

  constructor(useCase: IListSimilarGetAllUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { sort, page: { size, offset } = {} } = req.query as ListSimilarGetAllControllerQueryType;
    const { listId } = req.params;

    const tokenService = new TokenService();
    const session = tokenService.decodeToken<User>(req.cookies.sessionToken);
    const checkedListId = Number(listId);
    const checkedSort = sort || undefined;
    const checkedSize = Number(size) || undefined;
    const checkedOffset = Number(offset) || undefined;

    const response = await this.useCase.execute({ session, listId: checkedListId, sort: checkedSort, size: checkedSize, offset: checkedOffset });

    const formattedLists = response.map((item) => {
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
      lists: {
        self: URL_SERVER + PATH_API_V1 + '/lists',
      },
      data: formattedLists,
    };

    return res.status(200).send(formattedResponse);
  }
}
