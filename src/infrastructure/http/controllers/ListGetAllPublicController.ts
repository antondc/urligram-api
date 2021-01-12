import { Request, Response } from 'express';

import { IListGetAllPublicUseCase } from '@domain/list/useCases/ListGetAllPublicUseCase';
import { User } from '@domain/user/entities/User';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

type ListGetAllPublicControllerQueryType = {
  sort: 'id' | '-id' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt' | 'members' | '-members';
  page: {
    size: string;
  };
};

export class ListGetAllPublicController extends BaseController {
  useCase: IListGetAllPublicUseCase;

  constructor(useCase: IListGetAllPublicUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { sort, page: { size } = {} } = req.query as ListGetAllPublicControllerQueryType;
    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;
    const checkedSize = Number(size) || undefined;
    const checkedSort = sort || undefined;

    const response = await this.useCase.execute({ session, size: checkedSize, sort: checkedSort });

    const formattedLists = response.map((item) => {
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
      lists: {
        self: URL_SERVER + '/lists',
      },
      data: formattedLists,
    };

    return res.status(200).send(formattedResponse);
  }
}
