import { IGetLanguagesRepo } from '@domain/language/repositories/IGetLanguagesRepo';
import { IGetLanguagesResponseDTO } from '@domain/language/dto/IGetLanguagesResponseDTO';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { BaseError } from '@shared/errors/BaseError';
import { IGetLanguageRequestDTO } from '@domain/language/dto/IGetLanguageRequestDTO';

export class GetLanguagesRepo implements IGetLanguagesRepo {
  private mySQL: MySQL;

  constructor() {
    this.mySQL = new MySQL();
  }
  get: () => Promise<IGetLanguagesResponseDTO>;

  public async getAll(): Promise<IGetLanguagesResponseDTO> {
    try {
      const [languages] = await this.mySQL.query(`CALL get_all_languages()`);

      return languages;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await this.mySQL.close();
    }
  }

  public async getOne(getLanguageRequestDTO: IGetLanguageRequestDTO): Promise<IGetLanguagesResponseDTO> {
    try {
      const getLanguageQuery = `CALL get_language_by_slug('${JSON.stringify(getLanguageRequestDTO)}')`;

      const [[language]] = await this.mySQL.query(getLanguageQuery);

      return language;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await this.mySQL.close();
    }
  }
}
