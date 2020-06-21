import { ILanguagesRepo } from '../repositories/ILanguagesRepo';
import { IGetLanguagesResponseDTO } from '../dto/IGetLanguagesResponseDTO';
import { IGetLanguageRequestDTO } from '../dto/IGetLanguageRequestDTO';

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
