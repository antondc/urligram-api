import { Request, Response } from 'express';

import { ITagUserGetAllRequestDTO } from '@domain/tag/dto/ITagUserGetAllRequestDTO';
import { ITagUserGetAllUseCase } from '@domain/tag/useCases/TagUserGetAllUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class TagUserGetAllController extends BaseController {
  useCase: ITagUserGetAllUseCase;

  constructor(useCase: ITagUserGetAllUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { id } = req.params;

    const tagDeleteRequestDTO: ITagUserGetAllRequestDTO = {
      tagId: Number(id),
    };

    const response = await this.useCase.execute(tagDeleteRequestDTO);

    const formattedUsers = response.map((item) => {
      return {
        type: 'list',
        id: item.id,
        session: {
          self: URL_SERVER + '/users/' + item.id,
        },
        attributes: {
          ...item,
        },
      };
    });

    const formattedResponse = {
      lists: {
        self: URL_SERVER + '/tags/' + id + '/users',
      },
      data: formattedUsers,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
