import { IListRepo } from '@domain/list/repositories/IListRepo';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { BaseError } from '@shared/errors/BaseError';

export class ListRepo implements IListRepo {
  public async listGetOneById(listGetOneRequest) {
    const mySQL = new MySQL();

    try {
      const listGetOneQuery = `CALL list_get_one('${JSON.stringify(listGetOneRequest)}')`;

      const [[list]] = await mySQL.query(listGetOneQuery);

      return list;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listBookmarkGetOne(listBookmarkGetOneRequest) {
    const mySQL = new MySQL();

    try {
      const listBookmarkGetOneQuery = `CALL list_bookmark_get_one('${JSON.stringify(listBookmarkGetOneRequest)}')`;

      const [[results]] = await mySQL.query(listBookmarkGetOneQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listUserAdminGet(listUserGetOneRequestDTO) {
    const mySQL = new MySQL();

    try {
      const listUserGetOneQuery = `CALL list_user_get_one('${JSON.stringify(listUserGetOneRequestDTO)}')`;

      const [[results]] = await mySQL.query(listUserGetOneQuery);

      return results;
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
}
