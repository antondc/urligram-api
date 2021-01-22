import { IListRepo } from '@domain/list/repositories/IListRepo';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { BaseError } from '@shared/errors/BaseError';

export class ListRepo implements IListRepo {
  public async listGetAllPublic({ userId, sort, size }) {
    const mySQL = new MySQL();

    try {
      const listGetAllPublicQuery = 'CALL list_get_all_public(?, ?, ?)';

      const [list] = await mySQL.query(listGetAllPublicQuery, [userId, sort, size]);

      return list;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listGetOneById({ listId, sessionId }) {
    const mySQL = new MySQL();

    try {
      const listGetOneQuery = 'CALL list_get_one(?, ?)';

      const [[list]] = await mySQL.query(listGetOneQuery, [listId, sessionId]);

      return list;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listCreateOne({ userId, listName, listDescription, listIsPrivate }) {
    const mySQL = new MySQL();

    try {
      const listCreateOneQuery = 'CALL list_create(?, ?, ?, ?)';

      const [[results]] = await mySQL.query(listCreateOneQuery, [userId, listName, listDescription, listIsPrivate]);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listDeleteOne({ listId }) {
    const mySQL = new MySQL();

    try {
      const listDeleteOneQuery = 'CALL list_delete_one(?)';

      const [[results]] = await mySQL.query(listDeleteOneQuery, [listId]);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listUpdateOne({ listId, userId, name, description, isPrivate }) {
    const mySQL = new MySQL();

    try {
      const listUpdateOneQuery = 'CALL list_update_one(?, ?, ?, ?, ?)';

      const [[results]] = await mySQL.query(listUpdateOneQuery, [listId, userId, name, description, isPrivate]);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listBookmarkGetOne({ listId, bookmarkId }) {
    const mySQL = new MySQL();

    try {
      const listBookmarkGetOneQuery = 'CALL list_bookmark_get_one(?, ?)';

      const [[results]] = await mySQL.query(listBookmarkGetOneQuery, [listId, bookmarkId]);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listUserGetOneByListId({ userId, listId }) {
    const mySQL = new MySQL();

    try {
      const listUserGetOneByListIdQuery = 'CALL list_user_get_one_by_list_id(?, ?)';

      const [[results]] = await mySQL.query(listUserGetOneByListIdQuery, [userId, listId]);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listUserGetOneByListName({ userId, listName }) {
    const mySQL = new MySQL();

    try {
      const listUserGetOneByListNameQuery = 'CALL list_user_get_one_by_list_name(?, ?)';

      const [[results]] = await mySQL.query(listUserGetOneByListNameQuery, [userId, listName]);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listUserGetAll({ listId }) {
    const mySQL = new MySQL();

    try {
      const listUserGetAllQuery = 'CALL list_user_get_all(?)';

      const [results] = await mySQL.query(listUserGetAllQuery, [listId]);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listUserCreateOne({ listId, userId, userListStatus }) {
    const mySQL = new MySQL();

    try {
      const listUserCreateOneQuery = 'CALL list_user_create_one(?, ?, ?)';

      const [[results]] = await mySQL.query(listUserCreateOneQuery, [listId, userId, userListStatus]);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listUserUpdateOne({ listId, userId, userRole, userListStatus }) {
    const mySQL = new MySQL();

    try {
      const listUserUpdateOneQuery = 'CALL list_user_update_one(?, ?, ?, ?)';

      const [[results]] = await mySQL.query(listUserUpdateOneQuery, [listId, userId, userRole, userListStatus]);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listUserDeleteOne({ listId, userId }) {
    const mySQL = new MySQL();

    try {
      const listUserDeleteOneQuery = 'CALL list_user_delete_one(?, ?)';

      const [[results]] = await mySQL.query(listUserDeleteOneQuery, [listId, userId]);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listBookmarkGetAll({ listId }) {
    const mySQL = new MySQL();

    try {
      const listBookmarkGetAllQuery = 'CALL list_bookmark_get_all(?)';

      const [results] = await mySQL.query(listBookmarkGetAllQuery, [listId]);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listBookmarkCreateOne({ listId, bookmarkId }) {
    const mySQL = new MySQL();

    try {
      const listBookmarkCreateOneQuery = 'CALL list_bookmark_create_one(?, ?)';

      const [[results]] = await mySQL.query(listBookmarkCreateOneQuery, [listId, bookmarkId]);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listBookmarkDeleteOne({ listId, bookmarkId }) {
    const mySQL = new MySQL();

    try {
      const listBookmarkDeleteOneQuery = 'CALL list_bookmark_delete_one(?, ?)';

      const [[results]] = await mySQL.query(listBookmarkDeleteOneQuery, [listId, bookmarkId]);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }
}
