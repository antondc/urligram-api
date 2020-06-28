import { ILanguageGetAllResponseDTO } from '@domain/language/dto/ILanguageGetAllResponseDTO';
import { ILanguageGetOneRequestDTO } from '@domain/language/dto/ILanguageGetOneRequestDTO';
import { ILanguageGetOneResponseDTO } from '../dto/ILanguageGetOneResponseDTO';

export interface ILanguagesRepo {
  languageGetAll: () => Promise<ILanguageGetAllResponseDTO>;
  languageGetOne: (languageGetOneRequestDTO: ILanguageGetOneRequestDTO) => Promise<ILanguageGetOneResponseDTO>;
}
