import { Request, Response } from 'express';

import { ITagListGetAllPublicRequest } from '@domain/tag/useCases/interfaces/ITagListGetAllPublicRequest';
import { ITagListGetAllPublicUseCase } from '@domain/tag/useCases/TagListGetAllPublicUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class TagListGetAllPublicController extends BaseController {
  useCase: ITagListGetAllPublicUseCase;

  constructor(useCase: ITagListGetAllPublicUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { tagId } = req.params;

    const tagListGetAllPublic: ITagListGetAllPublicRequest = {
      tagId: Number(tagId),
    };

    const response = await this.useCase.execute(tagListGetAllPublic);

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
      links: {
        self: URL_SERVER + '/tags/' + tagId + '/lists/',
      },
      data: formattedLists,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
