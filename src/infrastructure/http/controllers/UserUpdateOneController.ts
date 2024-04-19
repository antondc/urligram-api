import { Request, Response } from 'express';

import { URLWrapper } from '@antoniodcorrea/utils';
import { TokenJWT } from '@antoniodcorrea/utils-backend';
import { User } from '@domain/user/entities/User';
import { IUserUpdateOneRequest } from '@domain/user/useCases/interfaces/IUserUpdateOneRequest';
import { IUserUpdateOneUseCase } from '@domain/user/useCases/UserUpdateOneUseCase';
import { ENDPOINT_CLIENTS, JWT_SECRET, PATH_API_V1, URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class UserUpdateOneController extends BaseController {
  useCase: IUserUpdateOneUseCase;

  constructor(useCase: IUserUpdateOneUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { name, email, statement, location, image } = req.body;

    const tokenService = new TokenJWT(JWT_SECRET);
    const session = tokenService.decodeToken<User>(req.cookies.sessionToken);

    const userUpdateRequest: IUserUpdateOneRequest = {
      session,
      name,
      email,
      statement,
      location,
      image,
    };

    const response = await this.useCase.execute(userUpdateRequest);
    const sessionToken = tokenService.createToken(response);

    const formattedResponse = {
      links: {
        self: URL_SERVER + PATH_API_V1 + '/users/me',
      },
      data: {
        type: 'user',
        id: response?.id,
        session: {
          self: URL_SERVER + PATH_API_V1 + '/users' + response.id,
        },
        attributes: response,
        relationships: {},
      },
      included: [],
    };

    const clientFound = ENDPOINT_CLIENTS.some((item) => item.includes(req.headers.origin)); // Identify the client

    const urlWrapper = new URLWrapper(`${req.protocol}://${req.hostname}`);
    const domainWithoutSubdomain = urlWrapper.getDomainWithoutSubdomain();
    const domainForCookie = clientFound ? '.' + domainWithoutSubdomain : null; // Return domain only for recognized clients

    return res
      .cookie('sessionToken', sessionToken, {
        maxAge: 24 * 60 * 60 * 1000 * 30, // One month
        httpOnly: true,
        path: '/',
        domain: domainForCookie, // We need to prepend «.» to enable any subdomain
      })
      .json(formattedResponse)
      .end();
  }
}
