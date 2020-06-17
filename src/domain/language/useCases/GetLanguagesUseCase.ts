import { IGetLanguagesRepo } from '../repositories/IGetLanguagesRepo';
import { IGetLanguagesResponseDTO } from '../dto/IGetLanguagesResponseDTO';

export interface IGetLanguagesUseCase {
  execute: () => Promise<IGetLanguagesResponseDTO>;
}

export class GetLanguagesUseCase implements IGetLanguagesUseCase {
  private getLanguagesRepo: IGetLanguagesRepo;

  constructor(getLanguagesRepo: IGetLanguagesRepo) {
    this.getLanguagesRepo = getLanguagesRepo;
  }

  public async execute(): Promise<IGetLanguagesResponseDTO> {
    const response = await this.getLanguagesRepo.get();

    return response;
  }
}
