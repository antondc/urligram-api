import { IListRepo } from '@domain/list/repositories/IListRepo';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { BaseError } from '@shared/errors/BaseError';

export class ListRepo implements IListRepo {
  public async listGetAllPublic() {
    const mySQL = new MySQL();

    try {
      const listGetAllPublicQuery = `CALL list_get_all_public()`;

      const [list] = await mySQL.query(listGetAllPublicQuery);

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

  public async listCreateOne(listCreateOneRequest) {
    const mySQL = new MySQL();

    try {
      const listCreateOneQuery = `CALL list_create('${JSON.stringify(listCreateOneRequest)}')`;

      const [[results]] = await mySQL.query(listCreateOneQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }


  public async listDeleteOne(listDeleteOneRequest) {
    const mySQL = new MySQL();

    try {
      const listDeleteOneQuery = `CALL list_delete_one('${JSON.stringify(listDeleteOneRequest)}')`;

      const [[results]] = await mySQL.query(listDeleteOneQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listUpdateOne(listUpdateOneRequest) {
    const mySQL = new MySQL();

    try {
      const listUpdateOneQuery = `CALL list_update_one('${JSON.stringify(listUpdateOneRequest)}')`;

      const [[results]] = await mySQL.query(listUpdateOneQuery);

      return results;
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

  public async listUserGetOneByListId(listUserGetOneByListIdRequest) {
    const mySQL = new MySQL();

    try {
      const listUserGetOneByListIdQuery = `CALL list_user_get_one_by_list_id('${JSON.stringify(listUserGetOneByListIdRequest)}')`;

      const [[results]] = await mySQL.query(listUserGetOneByListIdQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listUserGetOneByListName(listUserGetOneByListNameRequest) {
    const mySQL = new MySQL();

    try {
      const listUserGetOneByListNameQuery = `CALL list_user_get_one_by_list_name('${JSON.stringify(listUserGetOneByListNameRequest)}')`;

      const [[results]] = await mySQL.query(listUserGetOneByListNameQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listUserGetAll(listUserGetAllRequest) {
    const mySQL = new MySQL();

    try {
      const listUserGetAllQuery = `CALL list_user_get_all('${JSON.stringify(listUserGetAllRequest)}')`;

      const [results] = await mySQL.query(listUserGetAllQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listUserCreateOne(listUserCreateOneRequest) {
    const mySQL = new MySQL();

    try {
      const listUserCreateOneQuery = `CALL list_user_create_one('${JSON.stringify(listUserCreateOneRequest)}')`;

      const [[results]] = await mySQL.query(listUserCreateOneQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listUserUpdateOne(listUserUpdateOneRequest) {
    const mySQL = new MySQL();

    try {
      const listUserUpdateOneQuery = `CALL list_user_update_one('${JSON.stringify(listUserUpdateOneRequest)}')`;

      const [[results]] = await mySQL.query(listUserUpdateOneQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listUserDeleteOne(listUserDeleteOneRequest) {
    const mySQL = new MySQL();

    try {
      const listUserDeleteOneQuery = `CALL list_user_delete_one('${JSON.stringify(listUserDeleteOneRequest)}')`;

      const [[results]] = await mySQL.query(listUserDeleteOneQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listBookmarkGetAll(listBookmarkGetAllRequest) {
    const mySQL = new MySQL();

    try {
      const listBookmarkGetAllQuery = `CALL list_bookmark_get_all('${JSON.stringify(listBookmarkGetAllRequest)}')`;

      const [results] = await mySQL.query(listBookmarkGetAllQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listBookmarkCreateOne(listBookmarkCreateOneRequest) {
    const mySQL = new MySQL();

    try {
      const listBookmarkCreateOneQuery = `CALL list_bookmark_create_one('${JSON.stringify(listBookmarkCreateOneRequest)}')`;

      const [[results]] = await mySQL.query(listBookmarkCreateOneQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listBookmarkDeleteOne(listBookmarkDeleteOneRequest) {
    const mySQL = new MySQL();

    try {
      const listBookmarkDeleteOneQuery = `CALL list_bookmark_delete_one('${JSON.stringify(listBookmarkDeleteOneRequest)}')`;

      const [[results]] = await mySQL.query(listBookmarkDeleteOneQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }
}
