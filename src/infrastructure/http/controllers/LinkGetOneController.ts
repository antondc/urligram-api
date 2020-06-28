import { Request, Response } from 'express';

import { ILinkGetOneUseCase } from '@domain/link/useCases/LinkGetOneUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class LinkGetOneController extends BaseController {
  useCase: ILinkGetOneUseCase;

  constructor(useCase: ILinkGetOneUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { id } = req.params;
    const linkGetOneRequestDTO = { id };
    const response = await this.useCase.execute(linkGetOneRequestDTO);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/link',
      },
      data: [
        {
          type: 'link',
          id: response.id,
          session: {
            self: URL_SERVER + '/link',
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
