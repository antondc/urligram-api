import { IGetLanguageBySlugUseCase } from '@domain/language/useCases/GetLanguageBySlugUseCase';
import { URL_SERVER } from '@shared/constants/env';

export class GetLanguageBySlugController {
  getLanguageBySlugUseCase: IGetLanguageBySlugUseCase;

  constructor(getLanguageBySlugUseCase: IGetLanguageBySlugUseCase) {
    this.getLanguageBySlugUseCase = getLanguageBySlugUseCase;
  }

  async getOne() {
    const response = await this.getLanguageBySlugUseCase.execute();

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

    return formattedResponse;
  }
}
