import { Request, Response } from 'express';

import { ITagListGetAllRequestDTO } from '@domain/tag/dto/ITagListGetAllRequestDTO';
import { ITagListGetAllUseCase } from '@domain/tag/useCases/TagListGetAllUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class TagListGetAllController extends BaseController {
  useCase: ITagListGetAllUseCase;

  constructor(useCase: ITagListGetAllUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { id } = req.params;

    const tagDeleteRequestDTO: ITagListGetAllRequestDTO = {
      tagId: Number(id),
    };

    const response = await this.useCase.execute(tagDeleteRequestDTO);

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
      lists: {
        self: URL_SERVER + '/tags/' + id + '/lists',
      },
      data: formattedLists,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
