import { Request, Response } from 'express';

import { IListTagGetAllRequestDTO } from '@domain/list/dto/IListTagGetAllRequestDTO';
import { IListTagGetAllUseCase } from '@domain/list/useCases/ListTagGetAllUseCase';
import { User } from '@domain/user/entities/User';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListTagGetAllController extends BaseController {
  useCase: IListTagGetAllUseCase;

  constructor(useCase: IListTagGetAllUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { id } = req.params;
    const tokenService = new TokenService();
    const session = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const listDeleteRequestDTO: IListTagGetAllRequestDTO = {
      listId: Number(id),
      session,
    };

    const response = await this.useCase.execute(listDeleteRequestDTO);

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
        self: URL_SERVER + '/lists/' + id + '/tags',
      },
      data: formattedTags,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
