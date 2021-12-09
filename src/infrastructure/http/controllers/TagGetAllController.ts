import { Request, Response } from 'express';

import { ITagGetAllRequest } from '@domain/tag/useCases/interfaces/ITagGetAllRequest';
import { ITagGetAllUseCase } from '@domain/tag/useCases/TagGetAllUseCase';
import { User } from '@domain/user/entities/User';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { TokenService } from '@shared/services/TokenService';
import { BaseController } from './BaseController';

const DEFAULT_USER_TAGS_GET_ALL_SORT = '-count';

type TagsGetAllControllerQueryType = {
  sort: 'id' | '-id' | 'name' | '-name' | 'count' | '-count';
  page: {
    size: string;
    offset: string;
  };
  filter?: {
    tags?: string[];
  };
};

export class TagGetAllController extends BaseController {
  useCase: ITagGetAllUseCase;

  constructor(useCase: ITagGetAllUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { sort = DEFAULT_USER_TAGS_GET_ALL_SORT, page: { size, offset } = {}, filter: { tags } = {} } = req.query as TagsGetAllControllerQueryType;
    const castedSize = Number(size) || null;
    const castedOffset = Number(offset) || null;
    const tokenService = new TokenService();
    const session = tokenService.decodeToken<User>(req.cookies.sessionToken);

    const userUpdateRequest: ITagGetAllRequest = {
      session,
      sort,
      size: castedSize,
      offset: castedOffset,
      filter: {
        tags,
      },
    };

    const { meta, tags: tagsResponse } = await this.useCase.execute(userUpdateRequest);

    const formattedTags = tagsResponse?.map((item) => {
      return {
        type: 'tag',
        id: item.id,
        session: {
          self: URL_SERVER + PATH_API_V1 + '/tags/' + item.id,
        },
        attributes: {
          ...item,
        },
      };
    });

    const formattedResponse = {
      links: {
        self: URL_SERVER + PATH_API_V1 + '/tags',
      },
      meta,
      data: formattedTags,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
