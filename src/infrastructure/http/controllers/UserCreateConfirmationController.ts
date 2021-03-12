import { Request, Response } from 'express';

import { IUserCreateConfirmationRequest } from '@domain/user/useCases/interfaces/IUserCreateConfirmationRequest';
import { IUserCreateConfirmationUseCase } from '@domain/user/useCases/UserCreateConfirmationUseCase';
import { TokenService } from '@infrastructure/services/TokenService';
import { URLWrapper } from '@infrastructure/services/UrlWrapper';
import { ENDPOINT_CLIENTS, URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserCreateConfirmationController extends BaseController {
  useCase: IUserCreateConfirmationUseCase;

  constructor(useCase: IUserCreateConfirmationUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { name, token } = req.body;

    const userCreateRequest: IUserCreateConfirmationRequest = {
      name,
      token,
    };
    const response = await this.useCase.execute(userCreateRequest);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/users/me',
      },
      data: {
        type: 'session',
        id: response.id,
        session: {
          self: URL_SERVER + '/users/me',
        },
        attributes: response,
        relationships: {},
      },
      included: [],
    };

    const tokenService = new TokenService();
    const cookieToken = tokenService.createToken(response);

    const clientFound = ENDPOINT_CLIENTS.some((item) => item.includes(req.headers.origin)); // Identify the client
    const urlWrapper = new URLWrapper(req.hostname);
    const domainWithoutSubdomain = urlWrapper.getDomainWithoutSubdomain();
    const domainForCookie = clientFound ? '.' + domainWithoutSubdomain : null; // Return domain only for recognized clients

    return res
      .cookie('sessionToken', cookieToken, {
        maxAge: 24 * 60 * 60 * 1000 * 30, // One month
        httpOnly: true,
        path: '/',
        domain: domainForCookie, // We need to prepend «.» to enable any subdomain
      })
      .json(formattedResponse)
      .end();
  }
}
