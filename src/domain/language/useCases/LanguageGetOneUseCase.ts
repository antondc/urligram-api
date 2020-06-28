import { ILanguageGetOneRequestDTO } from '@domain/language/dto/ILanguageGetOneRequestDTO';
import { ILanguageGetOneResponseDTO } from '@domain/language/dto/ILanguageGetOneResponseDTO';
import { ILanguageRepo } from '@domain/language/repositories/ILanguageRepo';

export interface ILanguageGetOneUseCase {
  execute: (getLanguagesRequestDTO: ILanguageGetOneRequestDTO) => Promise<ILanguageGetOneResponseDTO>;
}

export class LanguageGetOneUseCase implements ILanguageGetOneUseCase {
  private languageRepo: ILanguageRepo;

  constructor(languageRepo: ILanguageRepo) {
    this.languageRepo = languageRepo;
  }

  public async execute(getLanguagesRequestDTO: ILanguageGetOneRequestDTO): Promise<ILanguageGetOneResponseDTO> {
    const response = await this.languageRepo.languageGetOne(getLanguagesRequestDTO);

    return response;
  }
}
