import { ILanguageRepo } from '@domain/language/repositories/ILanguageRepo';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { BaseError } from '@shared/errors/BaseError';

export class LanguageRepo implements ILanguageRepo {
  public async languageGetOne(languageGetOneRequestDTO) {
    const mySQL = new MySQL();

    try {
      const getLanguageQuery = `CALL language_get_one('${JSON.stringify(languageGetOneRequestDTO)}')`;

      const [[language]] = await mySQL.query(getLanguageQuery);

      return language;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }
}
