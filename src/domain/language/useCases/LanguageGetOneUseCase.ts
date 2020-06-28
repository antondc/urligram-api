import { ILanguageGetOneRequestDTO } from '@domain/language/dto/ILanguageGetOneRequestDTO';
import { ILanguageGetOneResponseDTO } from '@domain/language/dto/ILanguageGetOneResponseDTO';
import { ILanguagesRepo } from '@domain/language/repositories/ILanguagesRepo';

export interface ILanguageGetOneUseCase {
  execute: (getLanguagesRequestDTO: ILanguageGetOneRequestDTO) => Promise<ILanguageGetOneResponseDTO>;
}

export class LanguageGetOneUseCase implements ILanguageGetOneUseCase {
  private languagesRepo: ILanguagesRepo;

  constructor(languagesRepo: ILanguagesRepo) {
    this.languagesRepo = languagesRepo;
  }

  public async execute(getLanguagesRequestDTO: ILanguageGetOneRequestDTO): Promise<ILanguageGetOneResponseDTO> {
    const response = await this.languagesRepo.languageGetOne(getLanguagesRequestDTO);

    return response;
  }
}
