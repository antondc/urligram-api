import { IGetLanguagesResponseDTO } from '@domain/language/dto/IGetLanguagesResponseDTO';
import { ILanguagesRepo } from '@domain/language/repositories/ILanguagesRepo';

export interface IGetLanguagesUseCase {
  execute: () => Promise<IGetLanguagesResponseDTO>;
}

export class GetLanguagesUseCase implements IGetLanguagesUseCase {
  private languagesRepo: ILanguagesRepo;

  constructor(languagesRepo: ILanguagesRepo) {
    this.languagesRepo = languagesRepo;
  }

  public async execute(): Promise<IGetLanguagesResponseDTO> {
    const response = await this.languagesRepo.getAll();

    return response;
  }
}
