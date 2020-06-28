import { ILanguageGetAllResponseDTO } from '@domain/language/dto/ILanguageGetAllResponseDTO';
import { ILanguagesRepo } from '@domain/language/repositories/ILanguagesRepo';

export interface ILanguageGetAllUseCase {
  execute: () => Promise<ILanguageGetAllResponseDTO>;
}

export class LanguageGetAllUseCase implements ILanguageGetAllUseCase {
  private languagesRepo: ILanguagesRepo;

  constructor(languagesRepo: ILanguagesRepo) {
    this.languagesRepo = languagesRepo;
  }

  public async execute(): Promise<ILanguageGetAllResponseDTO> {
    const response = await this.languagesRepo.languageGetAll();

    return response;
  }
}
