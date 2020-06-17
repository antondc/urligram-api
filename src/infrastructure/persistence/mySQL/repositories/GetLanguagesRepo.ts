import { IGetLanguagesRepo } from '@domain/language/repositories/IGetLanguagesRepo';
import { IGetLanguagesResponseDTO } from '@domain/language/dto/IGetLanguagesResponseDTO';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { BaseError } from '@shared/errors/BaseError';

export class GetLanguagesRepo implements IGetLanguagesRepo {
  private mySQL: MySQL;

  constructor() {
    this.mySQL = new MySQL();
  }

  public async get(): Promise<IGetLanguagesResponseDTO> {
    try {
      const [languages] = await this.mySQL.query(`CALL get_all_languages()`);

      return languages;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await this.mySQL.close();
    }
  }
}
