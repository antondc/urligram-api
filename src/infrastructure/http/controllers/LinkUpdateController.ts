import { Request, Response } from 'express';

import { ILinkUpdateRequestDTO } from '@domain/link/dto/ILinkUpdateRequestDTO';
import { ILinkUpdateUseCase } from '@domain/link/useCases/LinkUpdateUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class LinkUpdateController extends BaseController {
  useCase: ILinkUpdateUseCase;

  constructor(useCase: ILinkUpdateUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { userId, vote, order, saved, isPrivate, url, tags } = req.body;
    const { id } = req.params;

    const linkUpdateRequestDTO: ILinkUpdateRequestDTO = {
      id: Number(id),
      userId,
      order,
      vote,
      saved,
      isPrivate,
      url,
      tags,
    };

    const response = await this.useCase.execute(linkUpdateRequestDTO);

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
