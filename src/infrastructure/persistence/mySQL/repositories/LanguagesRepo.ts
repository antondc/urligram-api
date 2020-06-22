import { IGetLanguageRequestDTO } from '@domain/language/dto/IGetLanguageRequestDTO';
import { IGetLanguagesResponseDTO } from '@domain/language/dto/IGetLanguagesResponseDTO';
import { ILanguagesRepo } from '@domain/language/repositories/ILanguagesRepo';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { BaseError } from '@shared/errors/BaseError';

export class getLanguagesRepo implements ILanguagesRepo {
  private mySQL: MySQL;

  constructor() {
    this.mySQL = new MySQL();
  }
  get: () => Promise<IGetLanguagesResponseDTO>;

  public async getAll(): Promise<IGetLanguagesResponseDTO> {
    try {
      const [languages] = await this.mySQL.query(`CALL languages_get_all()`);

      return languages;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await this.mySQL.close();
    }
  }

  public async getOne(getLanguageRequestDTO: IGetLanguageRequestDTO) {
    try {
      const getLanguageQuery = `CALL languages_get_one_by_slug('${JSON.stringify(getLanguageRequestDTO)}')`;

      const [[language]] = await this.mySQL.query(getLanguageQuery);

      return language;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await this.mySQL.close();
    }
  }
}
