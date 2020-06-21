import { IGetLanguageBySlugUseCase } from '@domain/language/useCases/GetLanguageBySlugUseCase';
import { IGetLanguageRequestDTO } from '@domain/language/dto/IGetLanguageRequestDTO';
import { URL_SERVER } from '@shared/constants/env';

export class GetLanguageBySlugController {
  getLanguageBySlugUseCase: IGetLanguageBySlugUseCase;

  constructor(getLanguageBySlugUseCase: IGetLanguageBySlugUseCase) {
    this.getLanguageBySlugUseCase = getLanguageBySlugUseCase;
  }

  async execute(getLanguagesRequestDTO: IGetLanguageRequestDTO) {
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

    return formattedResponse;
  }
}
