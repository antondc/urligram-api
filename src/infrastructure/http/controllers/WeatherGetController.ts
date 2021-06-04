import { Request, Response } from 'express';

import { User } from '@domain/user/entities/User';
import { IWeatherGetRequest } from '@domain/weather/useCases/interfaces/IWeatherGetRequest';
import { IWeatherGetUseCase } from '@domain/weather/useCases/WeatherGetUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { TokenService } from '@shared/services/TokenService';
import { BaseController } from './BaseController';

export class WeatherGetController extends BaseController {
  useCase: IWeatherGetUseCase;

  constructor(useCase: IWeatherGetUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { socket } = req;
    const tokenService = new TokenService();
    const session = tokenService.decodeToken(req?.cookies?.sessionToken) as User;

    const remoteIp = socket?.remoteAddress.replace('::ffff:', '');
    const userGetOneRequest: IWeatherGetRequest = {
      remoteAddress: remoteIp,
      session,
    };

    const response = await this.useCase.execute(userGetOneRequest);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/weather/single',
      },
      data: {
        type: 'weather',
        session: {
          self: URL_SERVER + '/weather/single',
        },
        attributes: response,
      },
    };

    return res.status(200).send(formattedResponse);
  }
}
