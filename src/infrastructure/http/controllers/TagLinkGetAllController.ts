import { Request, Response } from 'express';

import { ITagLinkGetAllRequestDTO } from '@domain/tag/dto/ITagLinkGetAllRequestDTO';
import { ITagLinkGetAllUseCase } from '@domain/tag/useCases/TagLinkGetAllUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class TagLinkGetAllController extends BaseController {
  useCase: ITagLinkGetAllUseCase;

  constructor(useCase: ITagLinkGetAllUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { id } = req.params;

    const tagDeleteRequestDTO: ITagLinkGetAllRequestDTO = {
      tagId: Number(id),
    };

    const response = await this.useCase.execute(tagDeleteRequestDTO);

    const formattedLinks = response.map((item) => {
      return {
        type: 'link',
        id: item.id,
        session: {
          self: URL_SERVER + '/links/' + item.id,
        },
        attributes: {
          ...item,
        },
      };
    });

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/tags/' + id + '/links',
      },
      data: formattedLinks,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
