import { ILanguageGetAllResponseDTO } from '@domain/language/dto/ILanguageGetAllResponseDTO';
import { ILanguageGetOneRequestDTO } from '@domain/language/dto/ILanguageGetOneRequestDTO';
import { ILanguageGetOneResponseDTO } from '@domain/language/dto/ILanguageGetOneResponseDTO';

export interface ILanguageRepo {
  languageGetAll: () => Promise<ILanguageGetAllResponseDTO>;
  languageGetOne: (languageGetOneRequestDTO: ILanguageGetOneRequestDTO) => Promise<ILanguageGetOneResponseDTO>;
}
