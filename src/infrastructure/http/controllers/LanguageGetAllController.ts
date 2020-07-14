import { Request, Response } from 'express';

import { ILanguageGetAllUseCase } from '@domain/language/useCases/LanguageGetAllUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class LanguageGetAllController extends BaseController {
  useCase: ILanguageGetAllUseCase;

  constructor(useCase: ILanguageGetAllUseCase) {
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
