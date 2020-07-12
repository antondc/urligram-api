import { Request, Response } from 'express';

import { ILinkCreateRequestDTO } from '@domain/link/dto/ILinkCreateRequestDTO';
import { ILinkCreateUseCase } from '@domain/link/useCases/LinkCreateUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class LinkCreateController extends BaseController {
  useCase: ILinkCreateUseCase;

  constructor(useCase: ILinkCreateUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { userId, vote, saved, isPrivate, url, tags, id } = req.body;

    const linkCreateRequestDTO: ILinkCreateRequestDTO = {
      id,
      userId,
      vote,
      saved,
      isPrivate,
      url,
      tags,
    };

    const response = await this.useCase.execute(linkCreateRequestDTO);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/link',
      },
      data: [
        {
          type: 'link',
          id: response?.id,
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
