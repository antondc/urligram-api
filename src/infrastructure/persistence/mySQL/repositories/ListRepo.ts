import { IListRepo } from '@domain/list/repositories/IListRepo';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { BaseError } from '@shared/errors/BaseError';

export class ListRepo implements IListRepo {
  public async listGetOne(listGetOneRequestDTO) {
    const mySQL = new MySQL();

    try {
      const listGetOneQuery = `CALL list_get_one('${JSON.stringify(listGetOneRequestDTO)}')`;

      const [[list]] = await mySQL.query(listGetOneQuery);

      return list;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listCreate(listCreateRequestDTO) {
    const mySQL = new MySQL();

    try {
      const listCreateQuery = `CALL list_create('${JSON.stringify(listCreateRequestDTO)}')`;

      const [[results]] = await mySQL.query(listCreateQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listUpdate(listUpdateRequestDTO) {
    const mySQL = new MySQL();

    try {
      const listUpdateQuery = `CALL list_update('${JSON.stringify(listUpdateRequestDTO)}')`;

      const [[results]] = await mySQL.query(listUpdateQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }
}
