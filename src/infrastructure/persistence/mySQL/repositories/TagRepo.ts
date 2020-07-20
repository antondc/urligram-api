import { ITagRepo } from '@domain/tag/repositories/ITagRepo';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { BaseError } from '@shared/errors/BaseError';

export class TagRepo implements ITagRepo {
  public async tagGetAll() {
    const mySQL = new MySQL();

    try {
      const tagGetAllQuery = `CALL tag_get_all()`;

      const [tags] = await mySQL.query(tagGetAllQuery);

      return tags;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }
}
