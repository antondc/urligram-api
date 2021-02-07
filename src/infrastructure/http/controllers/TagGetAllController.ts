import { Request, Response } from 'express';

import { ITagGetAllRequest } from '@domain/tag/useCases/interfaces/ITagGetAllRequest';
import { ITagGetAllUseCase } from '@domain/tag/useCases/TagGetAllUseCase';
import { User } from '@domain/user/entities/User';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

type TagsGetAllControllerQueryType = {
  sort: 'id' | '-id' | 'name' | '-name' | 'count' | '-count';
  page: {
    size: string;
    offset: string;
  };
};

export class TagGetAllController extends BaseController {
  useCase: ITagGetAllUseCase;

  constructor(useCase: ITagGetAllUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { sort, page: { size, offset } = {} } = req.query as TagsGetAllControllerQueryType;
    const castedSize = Number(size) || null;
    const castedOffset = Number(offset) || null;
    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

    const userUpdateRequest: ITagGetAllRequest = {
      session,
      sort,
      size: castedSize,
      offset: castedOffset,
    };

    const response = await this.useCase.execute(userUpdateRequest);

    const formattedTags = response.map((item) => {
      return {
        type: 'tag',
        id: item.id,
        session: {
          self: URL_SERVER + '/tags/' + item.id,
        },
        attributes: {
          ...item,
        },
      };
    });

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/tags',
      },
      data: formattedTags,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
