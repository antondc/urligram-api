import { Request, Response } from 'express';

import { IListLinkGetAllRequestDTO } from '@domain/list/dto/IListLinkGetAllRequestDTO';
import { IListLinkGetAllUseCase } from '@domain/list/useCases/ListLinkGetAllUseCase';
import { User } from '@domain/user/entities/User';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListLinkGetAllController extends BaseController {
  useCase: IListLinkGetAllUseCase;

  constructor(useCase: IListLinkGetAllUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { id } = req.params;
    const tokenService = new TokenService();
    const session = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const listDeleteRequestDTO: IListLinkGetAllRequestDTO = {
      listId: Number(id),
      session,
    };

    const response = await this.useCase.execute(listDeleteRequestDTO);

    const formattedLinks = response.links.map((item) => {
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
        self: URL_SERVER + '/lists/' + id + '/links',
      },
      data: response.list,
      included: { links: formattedLinks },
    };

    return res.status(200).send(formattedResponse);
  }
}
