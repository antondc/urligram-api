import { Request, Response } from 'express';

import { ITagUserGetAllPublicRequest } from '@domain/tag/useCases/interfaces/ITagUserGetAllPublicRequest';
import { ITagUserGetAllPublicUseCase } from '@domain/tag/useCases/TagUserGetAllPublicUseCase';
import { PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class TagUserGetAllPublicController extends BaseController {
  useCase: ITagUserGetAllPublicUseCase;

  constructor(useCase: ITagUserGetAllPublicUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { tagId } = req.params;

    const tagUserGetAllPublic: ITagUserGetAllPublicRequest = {
      tagId: Number(tagId),
    };
    const response = await this.useCase.execute(tagUserGetAllPublic);

    const formattedUsers = response.map((user) => {
      return {
        type: 'user',
        id: user.id,
        session: {
          self: URL_SERVER + PATH_API_V1 + '/users/' + user.id,
        },
        attributes: {
          ...user,
        },
      };
    });

    const formattedResponse = {
      links: {
        self: URL_SERVER + PATH_API_V1 + '/tags/' + tagId + '/users/',
      },
      data: formattedUsers,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
