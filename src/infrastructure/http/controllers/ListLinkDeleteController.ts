import { Request, Response } from 'express';

import { IListLinkDeleteRequestDTO } from '@domain/list/dto/IListLinkDeleteRequestDTO';
import { IListLinkDeleteUseCase } from '@domain/list/useCases/ListLinkDeleteUseCase';
import { User } from '@domain/user/entities/User';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListLinkDeleteController extends BaseController {
  useCase: IListLinkDeleteUseCase;

  constructor(useCase: IListLinkDeleteUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { id, linkId } = req.params;
    const tokenService = new TokenService();
    const session = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const listLinkDeleteUseCase: IListLinkDeleteRequestDTO = {
      listId: Number(id),
      linkId: Number(linkId),
      session
    };

    const response = await this.useCase.execute(listLinkDeleteUseCase);

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
