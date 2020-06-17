import { IGetLanguagesUseCase } from '@domain/language/useCases/GetLanguagesUseCase';
import { URL_SERVER } from '@shared/constants/env';

export class GetLanguagesAdapter {
  getLanguagesUseCase: IGetLanguagesUseCase;

  constructor(getLanguagesUseCase: IGetLanguagesUseCase) {
    this.getLanguagesUseCase = getLanguagesUseCase;
  }

  async get() {
    const response = await this.getLanguagesUseCase.execute();
    
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
