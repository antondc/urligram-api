import { ILanguageGetAllResponseDTO } from '@domain/language/dto/ILanguageGetAllResponseDTO';
import { ILanguageRepo } from '@domain/language/repositories/ILanguageRepo';

export interface ILanguageGetAllUseCase {
  execute: () => Promise<ILanguageGetAllResponseDTO>;
}

export class LanguageGetAllUseCase implements ILanguageGetAllUseCase {
  private languageRepo: ILanguageRepo;

  constructor(languageRepo: ILanguageRepo) {
    this.languageRepo = languageRepo;
  }

  public async execute(): Promise<ILanguageGetAllResponseDTO> {
    const response = await this.languageRepo.languageGetAll();

    return response;
  }
}
