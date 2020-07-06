import { Request, Response } from 'express';

import { ITagGetAllUseCase } from '@domain/tag/useCases/TagGetAllUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class TagGetAllController extends BaseController {
  useCase: ITagGetAllUseCase;

  constructor(useCase: ITagGetAllUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const response = await this.useCase.execute();

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
