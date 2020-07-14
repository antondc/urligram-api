import { Request, Response } from 'express';

import { IListLinkGetOneRequestDTO } from '@domain/list/dto/IListLinkGetOneRequestDTO';
import { IListLinkGetOneUseCase } from '@domain/list/useCases/ListLinkGetOneUseCase';
import { User } from '@domain/user/entities/User';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListLinkGetOneController extends BaseController {
  useCase: IListLinkGetOneUseCase;

  constructor(useCase: IListLinkGetOneUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { id, linkId } = req.params;
    const tokenService = new TokenService();
    const session = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const listLinkGetOneUseCase: IListLinkGetOneRequestDTO = {
      listId: Number(id),
      linkId: Number(linkId),
      session,
    };

    const response = await this.useCase.execute(listLinkGetOneUseCase);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/lists/' + id,
      },
      data: [
        {
          type: 'user',
          session: {
            self: URL_SERVER + '/lists/' + id + '/links/' + linkId,
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
