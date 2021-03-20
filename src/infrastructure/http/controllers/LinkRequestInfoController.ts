import { Request, Response } from 'express';

import { ILinkRequestInfoRequest } from '@domain/link/useCases/interfaces/ILinkRequestInfoRequest';
import { ILinkRequestInfoUseCase } from '@domain/link/useCases/LinkRequestInfoUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

type LinkRequestInfoControllerQueryType = {
  url: string;
};

export class LinkRequestInfoController extends BaseController {
  useCase: ILinkRequestInfoUseCase;

  constructor(useCase: ILinkRequestInfoUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { url } = req.query as LinkRequestInfoControllerQueryType;

    const linkRequestInfoRequest: ILinkRequestInfoRequest = {
      url,
    };

    const response = await this.useCase.execute(linkRequestInfoRequest);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/links',
      },
      data: [
        {
          type: 'link',
          attributes: response,
        },
      ],
    };

    return res.status(200).send(formattedResponse);
  }
}
