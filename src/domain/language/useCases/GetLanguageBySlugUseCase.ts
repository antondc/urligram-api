import { ILanguageGetAllRequestDTO } from '@domain/language/dto/ILanguageGetAllRequestDTO';
import { ILanguageGetAllResponseDTO } from '@domain/language/dto/ILanguageGetAllResponseDTO';
import { ILanguagesRepo } from '@domain/language/repositories/ILanguagesRepo';

export interface IGetLanguageBySlugUseCase {
  execute: (getLanguagesRequestDTO: ILanguageGetAllRequestDTO) => Promise<ILanguageGetAllResponseDTO>;
}

export class GetLanguageBySlugUseCase implements IGetLanguageBySlugUseCase {
  private languagesRepo: ILanguagesRepo;

  constructor(languagesRepo: ILanguagesRepo) {
    this.languagesRepo = languagesRepo;
  }

  public async execute(getLanguagesRequestDTO: ILanguageGetAllRequestDTO): Promise<ILanguageGetAllResponseDTO> {
    const response = await this.languagesRepo.languageGetOne(getLanguagesRequestDTO);

    return response;
  }
}
