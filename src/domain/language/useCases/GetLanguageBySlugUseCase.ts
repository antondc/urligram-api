import { IGetLanguagesRepo } from '../repositories/IGetLanguagesRepo';
import { IGetLanguagesResponseDTO } from '../dto/IGetLanguagesResponseDTO';
import { IGetLanguageRequestDTO } from '../dto/IGetLanguageRequestDTO';

export interface IGetLanguageBySlugUseCase {
  execute: () => Promise<IGetLanguagesResponseDTO>;
}

export class GetLanguageBySlugUseCase implements IGetLanguageBySlugUseCase {
  private getLanguagesRepo: IGetLanguagesRepo;
  private getLanguagesRequestDTO: IGetLanguageRequestDTO;

  constructor(getLanguagesRepo: IGetLanguagesRepo, getLanguagesRequestDTO: IGetLanguageRequestDTO) {
    this.getLanguagesRepo = getLanguagesRepo;
    this.getLanguagesRequestDTO = getLanguagesRequestDTO;
  }

  public async execute(): Promise<IGetLanguagesResponseDTO> {
    const response = await this.getLanguagesRepo.getOne(this.getLanguagesRequestDTO);

    return response;
  }
}
