import { Request, Response } from 'express';

import { IGetLanguageBySlugUseCase } from '@domain/language/useCases/GetLanguageBySlugUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class GetLanguageBySlugController extends BaseController {
  useCase: IGetLanguageBySlugUseCase;

  constructor(useCase: IGetLanguageBySlugUseCase) {
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
