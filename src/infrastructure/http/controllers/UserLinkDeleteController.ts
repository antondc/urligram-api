import { Request, Response } from 'express';

import { IUserLinkDeleteRequestDTO } from '@domain/user/dto/IUserLinkDeleteRequestDTO';
import { User } from '@domain/user/entities/User';
import { IUserLinkDeleteUseCase } from '@domain/user/useCases/UserLinkDeleteUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserLinkDeleteController extends BaseController {
  useCase: IUserLinkDeleteUseCase;

  constructor(useCase: IUserLinkDeleteUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { linkId } = req.params;
    const tokenService = new TokenService();
    const session = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const UserlinkDeleteRequestDTO: IUserLinkDeleteRequestDTO = {
      linkId: Number(linkId),
      session,
    };

    const response = await this.useCase.execute(UserlinkDeleteRequestDTO);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/link',
      },
      data: [
        {
          type: 'link',
          id: response,
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
