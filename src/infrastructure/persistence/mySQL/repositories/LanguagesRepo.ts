import { ILanguagesRepo } from '@domain/language/repositories/ILanguagesRepo';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { BaseError } from '@shared/errors/BaseError';

export class getLanguagesRepo implements ILanguagesRepo {
  private mySQL: MySQL;

  constructor() {
    this.mySQL = new MySQL();
  }

  public async languageGetAll() {
    try {
      const [languages] = await this.mySQL.query(`CALL language_get_all()`);

      return languages;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await this.mySQL.close();
    }
  }

  public async languageGetOne(languageGetOneRequestDTO) {
    try {
      const getLanguageQuery = `CALL language_get_one('${JSON.stringify(languageGetOneRequestDTO)}')`;

      const [[language]] = await this.mySQL.query(getLanguageQuery);

      return language;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await this.mySQL.close();
    }
  }
}
