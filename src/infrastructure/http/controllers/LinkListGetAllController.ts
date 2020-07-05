import { Request, Response } from 'express';

import { ILinkListGetAllRequestDTO } from '@domain/link/dto/ILinkListGetAllRequestDTO';
import { ILinkListGetAllUseCase } from '@domain/link/useCases/LinkListGetAllUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class LinkListGetAllController extends BaseController {
  useCase: ILinkListGetAllUseCase;

  constructor(useCase: ILinkListGetAllUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { id } = req.params;

    const linkLinkGetAllRequestDTO: ILinkListGetAllRequestDTO = {
      linkId: Number(id),
    };

    const response = await this.useCase.execute(linkLinkGetAllRequestDTO);

    const formattedLinks = response.map((item) => {
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
        self: URL_SERVER + '/links/' + id + '/lists',
      },
      data: formattedLinks,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
