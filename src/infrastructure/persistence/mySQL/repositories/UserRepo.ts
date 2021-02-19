import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { BaseError } from '@shared/errors/BaseError';
import { RequestError } from '@shared/errors/RequestError';

export class UserRepo implements IUserRepo {
  public async userGetAll({ sessionId, sort, size, offset }) {
    const mySQL = new MySQL();
    try {
      const userGetAllQuery = 'CALL user_get_all(?, ?, ?, ?)';
      const [users] = await mySQL.query(userGetAllQuery, [sessionId, sort, size, offset]);
      const usersWithoutTotal = users.map((item) => ({ ...item, totalItems: undefined }));

      return {
        meta: {
          totalItems: users[0]?.totalItems || 0,
          size,
          offset,
          sort,
        },
        users: usersWithoutTotal,
      };
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userGetByIds({ sessionId, userIds, sort, size, offset }) {
    const mySQL = new MySQL();
    try {
      const userGetByIdsQuery = 'CALL user_get_by_ids(?, ?, ?, ?, ?)';
      const [results] = await mySQL.query(userGetByIdsQuery, [sessionId, JSON.stringify(userIds), sort, size, offset]);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userGetOne({ sessionId = null, userId = null, email = null, name = null }) {
    const mySQL = new MySQL();
    try {
      const userGetOneQuery = 'CALL user_get_one(?, ?, ?, ?)';
      const [[results]] = await mySQL.query(userGetOneQuery, [sessionId, userId, email, name]);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userCreateOne({ name, email, password }) {
    const mySQL = new MySQL();
    try {
      const userCreateQuery = 'CALL user_create(?, ?, ?)';
      const [[results]] = await mySQL.query(userCreateQuery, [name, email, password]);

      return results;
    } catch (err) {
      throw new RequestError('User creation failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userUpdateOne({ userId, name, email, statement, location }) {
    const mySQL = new MySQL();
    try {
      const userUpdateQuery = 'CALL user_update(?, ?, ?, ?, ?)';
      const [[results]] = await mySQL.query(userUpdateQuery, [userId, name, email, statement, location]);

      return results;
    } catch (err) {
      throw new RequestError('User update failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userDeleteOne({ userId }) {
    const mySQL = new MySQL();
    try {
      const userDeleteQuery = 'CALL user_delete_one(?)';
      const [[results]] = await mySQL.query(userDeleteQuery, [userId]);

      return results;
    } catch (err) {
      throw new RequestError('User update failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userLogin({ name, password, userId = null }) {
    const mySQL = new MySQL();
    try {
      const userLoginQuery = 'CALL user_login(?, ?, ?)';

      const [[user]] = await mySQL.query(userLoginQuery, [name, password, userId]);

      return user;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userLogSession({ userId, result, type }) {
    const mySQL = new MySQL();
    try {
      const logSessionQuery = 'CALL user_log_session(?, ?, ?)';

      await mySQL.query(logSessionQuery, [userId, result, type]);

      return null;
    } catch (err) {
      throw new BaseError('Error loging user session', 401, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userPasswordUpdate({ userId, newPassword }) {
    const mySQL = new MySQL();
    try {
      const userPasswordUpdateQuery = 'CALL user_password_update(?, ?)';
      const [[results]] = await mySQL.query(userPasswordUpdateQuery, [userId, newPassword]);

      return results;
    } catch (err) {
      throw new RequestError('User update failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userFollowingGetAll({ sessionId, userId, sort, size, offset }) {
    const mySQL = new MySQL();
    try {
      const userFollowingGetAllQuery = 'CALL user_following_get_all(?, ?, ?, ?, ?)';
      const [users] = await mySQL.query(userFollowingGetAllQuery, [sessionId, userId, sort, size, offset]);

      const usersWithoutTotal = users.map((item) => ({ ...item, totalItems: undefined }));

      return {
        meta: {
          totalItems: users[0]?.totalItems || 0,
          size,
          offset,
          sort,
        },
        users: usersWithoutTotal,
      };
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userFollowingGetOne({ userId, followedId }) {
    const mySQL = new MySQL();
    try {
      const userFollowingGetOneQuery = 'CALL user_following_get_one(?, ?)';
      const [[results]] = await mySQL.query(userFollowingGetOneQuery, [userId, followedId]);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userFollowingCreate({ userId, followedId }) {
    const mySQL = new MySQL();
    try {
      const userFollowingQuery = 'CALL user_following_create(?, ?)';
      const [[results]] = await mySQL.query(userFollowingQuery, [userId, followedId]);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userFollowingDelete({ userId, followedId }) {
    const mySQL = new MySQL();
    try {
      const userFollowingDeleteQuery = 'CALL user_following_delete(?, ?)';
      const [[results]] = await mySQL.query(userFollowingDeleteQuery, [userId, followedId]);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userFollowerGetAll({ sessionId, userId, sort, size, offset }) {
    const mySQL = new MySQL();
    try {
      const userFollowerGetAllQuery = 'CALL user_follower_get_all(?, ?, ?, ?, ?)';
      const [users] = await mySQL.query(userFollowerGetAllQuery, [sessionId, userId, sort, size, offset]);
      
      const usersWithoutTotal = users.map((item) => ({ ...item, totalItems: undefined }));

      return {
        meta: {
          totalItems: users[0]?.totalItems || 0,
          size,
          offset,
          sort,
        },
        users: usersWithoutTotal,
      };
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userBookmarkGetAll({ sessionId, userId, sort, size, offset }) {
    const mySQL = new MySQL();
    try {
      const userBookmarkGetAllQuery = 'CALL user_bookmark_get_all(?, ?, ?, ?, ?)';
      const [bookmarks] = await mySQL.query(userBookmarkGetAllQuery, [sessionId, userId, sort, size, offset]);

      const bookmarksWithTotal = bookmarks.map((item) => ({ ...item, totalItems: undefined }));

      return {
        meta: {
          totalItems: bookmarks[0]?.totalItems || 0,
          size,
          offset,
          sort,
        },
        bookmarks: bookmarksWithTotal,
      };
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userBookmarkGetOneByBookmarkIdUserId({ bookmarkId, userId }) {
    const mySQL = new MySQL();
    try {
      const userBookmarkGetOneByBookmarkIdUserIdQuery = 'CALL user_bookmark_get_one_by_id(?, ?)';
      const [[results]] = await mySQL.query(userBookmarkGetOneByBookmarkIdUserIdQuery, [bookmarkId, userId]);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userBookmarkGetOneByLinkIdUserId({ linkId, userId }) {
    const mySQL = new MySQL();
    try {
      const userBookmarkGetOneByLinkIdUserIdQuery = 'CALL user_bookmark_get_one_by_link_user(?, ?)';
      const [[results]] = await mySQL.query(userBookmarkGetOneByLinkIdUserIdQuery, [linkId, userId]);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userBookmarkGetOneByUserIdPathDomain({ userId, path, domain }) {
    const mySQL = new MySQL();
    try {
      const userBookmarkGetOneByLinkIdUserIdQuery = 'CALL user_bookmark_get_one_by_user_path_domain(?, ?, ?)';
      const [[results]] = await mySQL.query(userBookmarkGetOneByLinkIdUserIdQuery, [userId, path, domain]);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userBookmarkCreate({ userId, title, saved, isPrivate, domain, path, tags }) {
    const mySQL = new MySQL();

    try {
      const userBookmarkCreateQuery = 'CALL user_bookmark_create(?, ?, ?, ?, ?, ?, ?)';

      const [[results]] = await mySQL.query(userBookmarkCreateQuery, [userId, title, saved, isPrivate, domain, path, JSON.stringify(tags)]);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userBookmarkUpdate({ bookmarkId, order, title, userId, saved, isPrivate, domain, path, tags }) {
    const mySQL = new MySQL();

    try {
      const userBookmarkUpdateQuery = 'CALL user_bookmark_update(?, ?, ?, ?, ?, ?, ?, ?, ?)';

      const [[results]] = await mySQL.query(userBookmarkUpdateQuery, [bookmarkId, order, title, userId, saved, isPrivate, domain, path, JSON.stringify(tags)]);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userBookmarkDeleteOne({ bookmarkId }) {
    const mySQL = new MySQL();

    try {
      const userBookmarkDeleteOneQuery = 'CALL user_bookmark_delete(?)';

      const [[result]] = await mySQL.query(userBookmarkDeleteOneQuery, [bookmarkId]);

      return result;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userListGetAllPublic({ userId, sessionId, sort, size, offset, filter }) {
    const mySQL = new MySQL();
    try {
      const userListGetAllPublicQuery = 'CALL user_list_get_all(?, ?, ?, ?, ?, ?)';
      const [lists] = await mySQL.query(userListGetAllPublicQuery, [userId, sessionId, sort, size, offset, JSON.stringify(filter)]);

      const listsWithTotal = lists.map((item) => ({ ...item, totalItems: undefined }));

      return {
        meta: {
          totalItems: lists[0]?.totalItems || 0,
          size,
          offset,
          sort,
          filter,
        },
        lists: listsWithTotal,
      };
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userTagsGetAll({ userId, sessionId, sort, size, offset }) {
    const mySQL = new MySQL();

    try {
      const userTagsGetAllQuery = 'CALL user_tags_get_all(?, ?, ?, ?, ?)';

      const [results] = await mySQL.query(userTagsGetAllQuery, [userId, sessionId, sort, size, offset]);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }
}
