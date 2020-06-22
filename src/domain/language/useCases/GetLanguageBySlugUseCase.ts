import { IGetLanguageRequestDTO } from '@domain/language/dto/IGetLanguageRequestDTO';
import { IGetLanguagesResponseDTO } from '@domain/language/dto/IGetLanguagesResponseDTO';
import { ILanguagesRepo } from '@domain/language/repositories/ILanguagesRepo';

export interface IGetLanguageBySlugUseCase {
  execute: (getLanguagesRequestDTO: IGetLanguageRequestDTO) => Promise<IGetLanguagesResponseDTO>;
}

export class GetLanguageBySlugUseCase implements IGetLanguageBySlugUseCase {
  private languagesRepo: ILanguagesRepo;

  constructor(languagesRepo: ILanguagesRepo) {
    this.languagesRepo = languagesRepo;
  }

  public async execute(getLanguagesRequestDTO: IGetLanguageRequestDTO): Promise<IGetLanguagesResponseDTO> {
    const response = await this.languagesRepo.getOne(getLanguagesRequestDTO);

    return response;
  }
}
