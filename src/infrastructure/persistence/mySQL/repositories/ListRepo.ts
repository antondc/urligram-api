import { IListRepo } from '@domain/list/repositories/IListRepo';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { BaseError } from '@shared/errors/BaseError';

export class ListRepo implements IListRepo {
  public async listGetAll(listGetAllRequest) {
    const mySQL = new MySQL();

    try {
      const listGetAllQuery = `CALL list_get_All('${JSON.stringify(listGetAllRequest)}')`;

      const [list] = await mySQL.query(listGetAllQuery);

      return list;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

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

  public async listCreateOne(listCreateOneRequestDTO) {
    const mySQL = new MySQL();

    try {
      const listCreateOneQuery = `CALL list_create('${JSON.stringify(listCreateOneRequestDTO)}')`;

      const [[results]] = await mySQL.query(listCreateOneQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }
}
