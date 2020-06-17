import { IGetLanguagesResponseDTO } from '@domain/language/dto/IGetLanguagesResponseDTO';

export interface IGetLanguagesRepo {
  get: () => Promise<IGetLanguagesResponseDTO>;
}
