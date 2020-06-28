import { ILanguageGetAllRequestDTO } from '@domain/language/dto/ILanguageGetAllRequestDTO';
import { ILanguageGetAllResponseDTO } from '@domain/language/dto/ILanguageGetAllResponseDTO';

export interface ILanguagesRepo {
  languageGetAll: () => Promise<ILanguageGetAllResponseDTO>;
  languageGetOne: (languageGetAllRequestDTO: ILanguageGetAllRequestDTO) => Promise<ILanguageGetAllResponseDTO>;
}
