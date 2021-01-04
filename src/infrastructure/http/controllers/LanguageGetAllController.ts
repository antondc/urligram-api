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

    const items = response.reduce((acc, curr) => {
      return acc.concat({
        type: 'languages',
        attributes: curr,
        links: {
          self: URL_SERVER + '/languages/' + curr.slug,
        },
      });
    }, []);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/languages',
      },
      data: items,
    };

    return res.status(200).send(formattedResponse);
  }
}
