import { ILanguageGetOneRequestRepo } from '@domain/language/repositories/interfaces/ILanguageGetOneRequestRepo';
import { ILanguageGetOneResponseRepo } from '@domain/language/repositories/interfaces/ILanguageGetOneResponseRepo';

export interface ILanguageRepo {
  languageGetOne: (languageGetOneRequestDTO: ILanguageGetOneRequestRepo) => Promise<ILanguageGetOneResponseRepo>;
}
