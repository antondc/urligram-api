import { IGetLanguagesResponseDTO } from '@domain/language/dto/IGetLanguagesResponseDTO';
import { IGetLanguageRequestDTO } from '../dto/IGetLanguageRequestDTO';

export interface IGetLanguagesRepo {
  getAll: () => Promise<IGetLanguagesResponseDTO>;
  getOne: (getLanguageRequestDTO: IGetLanguageRequestDTO) => Promise<IGetLanguagesResponseDTO>;
}
