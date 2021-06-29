import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IUserTagsGetAllRequest } from '@domain/user/useCases/interfaces/IUserTagsGetAllRequest';
import { IUserTagsGetAllUseCase } from '@domain/user/useCases/UserTagsGetAllUseCase';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { TokenService } from '@shared/services/TokenService';
import { BaseController } from './BaseController';

const DEFAULT_USER_TAGS_GET_ALL_SORT = '-count';

type UserTagsGetAllControllerQueryType = {
  sort: 'id' | '-id' | 'name' | '-name' | 'count' | '-count';
  page: {
    size: string;
    offset: string;
  };
};

export class UserTagsGetAllController extends BaseController {
  useCase: IUserTagsGetAllUseCase;

  constructor(useCase: IUserTagsGetAllUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { sort = DEFAULT_USER_TAGS_GET_ALL_SORT, page: { size, offset } = {} } = req.query as UserTagsGetAllControllerQueryType;
    const { userId } = req.params;
    const castedSize = Number(size) || null;
    const castedOffset = Number(offset) || null;
    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req.cookies.sessionToken) as User;

    const userUpdateRequest: IUserTagsGetAllRequest = {
      session,
      userId,
      sort,
      size: castedSize,
      offset: castedOffset,
    };

    const { tags, meta } = await this.useCase.execute(userUpdateRequest);

    const formattedItems = tags?.map((item) => {
      return {
        type: 'tag',
        id: item.id,
        attributes: item,
      };
    });

    const formattedResponse = {
      links: {
        self: URL_SERVER + PATH_API_V1 + '/users/' + userId + '/tags',
      },
      meta,
      data: formattedItems,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
