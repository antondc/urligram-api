import { Request, Response } from 'express';

import { ILanguageGetOneUseCase } from '@domain/language/useCases/LanguageGetOneUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class LanguageGetOneController extends BaseController {
  useCase: ILanguageGetOneUseCase;

  constructor(useCase: ILanguageGetOneUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { slug } = req.params;
    const getLanguagesRequestDTO = { slug };
    const response = await this.useCase.execute(getLanguagesRequestDTO);

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
