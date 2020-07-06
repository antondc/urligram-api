import { Request, Response } from 'express';

import { ITagGetOneUseCase } from '@domain/tag/useCases/TagGetOneUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class TagGetOneController extends BaseController {
  useCase: ITagGetOneUseCase;

  constructor(useCase: ITagGetOneUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { name } = req.body;
    const { id } = req.params;

    const tagGetOneRequestDTO = {
      id: Number(id),
      name,
    };

    const response = await this.useCase.execute(tagGetOneRequestDTO);

    const formattedResponse = {
      tags: {
        self: URL_SERVER + '/tags',
      },
      data: [
        {
          type: 'tag',
          id: response.id,
          session: {
            self: URL_SERVER + '/tags/' + response.id,
          },
          attributes: response,
          relationships: {},
        },
      ],
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
