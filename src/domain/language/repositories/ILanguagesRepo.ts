import { IGetLanguageRequestDTO } from '@domain/language/dto/IGetLanguageRequestDTO';
import { IGetLanguagesResponseDTO } from '@domain/language/dto/IGetLanguagesResponseDTO';

export interface ILanguagesRepo {
  getAll: () => Promise<IGetLanguagesResponseDTO>;
  getOne: (getLanguageRequestDTO: IGetLanguageRequestDTO) => Promise<IGetLanguagesResponseDTO>;
}
