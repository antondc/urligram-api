import { NextFunction, Request, Response } from 'express';

import { IGetLanguageBySlugUseCase } from '@domain/language/useCases/GetLanguageBySlugUseCase';
import { URL_SERVER } from '@shared/constants/env';

export class GetLanguageBySlugController {
  getLanguageBySlugUseCase: IGetLanguageBySlugUseCase;

  constructor(getLanguageBySlugUseCase: IGetLanguageBySlugUseCase) {
    this.getLanguageBySlugUseCase = getLanguageBySlugUseCase;
  }

  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const getLanguagesRequestDTO = { slug };
      const response = await this.getLanguageBySlugUseCase.execute(getLanguagesRequestDTO);

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
    } catch (err) {
      return next(err);
    }
  }
}
