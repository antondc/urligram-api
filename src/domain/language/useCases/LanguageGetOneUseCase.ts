import { ILanguageRepo } from '@domain/language/repositories/ILanguageRepo';
import { ILanguageGetOneUseCaseRequest } from '@domain/language/useCases/interfaces/ILanguageGetOneUseCaseRequest';
import { ILanguageGetOneUseCaseResponse } from '@domain/language/useCases/interfaces/ILanguageGetOneUseCaseResponse';

export interface ILanguageGetOneUseCase {
  execute: (getLanguagesRequestDTO: ILanguageGetOneUseCaseRequest) => Promise<ILanguageGetOneUseCaseResponse>;
}

export class LanguageGetOneUseCase implements ILanguageGetOneUseCase {
  private languageRepo: ILanguageRepo;

  constructor(languageRepo: ILanguageRepo) {
    this.languageRepo = languageRepo;
  }

  public async execute(getLanguagesRequestDTO: ILanguageGetOneUseCaseRequest): Promise<ILanguageGetOneUseCaseResponse> {
    const response = await this.languageRepo.languageGetOne(getLanguagesRequestDTO);

    return response;
  }
}
