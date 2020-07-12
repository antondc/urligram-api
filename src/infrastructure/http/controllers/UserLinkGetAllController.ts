import { Request, Response } from 'express';

import { IUserLinkGetAllRequestDTO } from '@domain/user/dto/IUserLinkGetAllRequestDTO';
import { User } from '@domain/user/entities/User';
import { IUserLinkGetAllUseCase } from '@domain/user/useCases/UserLinkGetAllUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserLinkGetAllController extends BaseController {
  useCase: IUserLinkGetAllUseCase;

  constructor(useCase: IUserLinkGetAllUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { id: userId } = req.params;

    const tokenService = new TokenService();
    const session = tokenService.verifyToken(req.cookies.sessionToken) as User;

    const userLinkGetAllRequestDTO: IUserLinkGetAllRequestDTO = {
      userId,
      session,
    };

    const response = await this.useCase.execute(userLinkGetAllRequestDTO);

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
        self: URL_SERVER + '/links',
      },
      data: formattedLinks,
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
