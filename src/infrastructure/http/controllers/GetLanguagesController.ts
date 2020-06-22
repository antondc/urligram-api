import { Request, Response } from 'express';

import { IGetLanguagesUseCase } from '@domain/language/useCases/GetLanguagesUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class GetLanguagesController extends BaseController {
  useCase: IGetLanguagesUseCase;

  constructor(useCase: IGetLanguagesUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const response = await this.useCase.execute();

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/language',
      },
      data: [
        {
          type: 'language',
          id: response.id,
          session: {
            self: URL_SERVER + '/language',
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
