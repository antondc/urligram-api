import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { BaseError } from '@shared/errors/BaseError';
import { RequestError } from '@shared/errors/RequestError';

export class UserRepo implements IUserRepo {
  public async userGetCredentials({ userId }) {
    const mySQL = new MySQL();
    try {
      const userGetAllQuery = 'CALL user_get_credentials(?)';
      const [[userCredentials]] = await mySQL.query(userGetAllQuery, [userId]);

      return userCredentials;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }
  public async userGetAll({ sessionId, sort, size, offset, filter }) {
    const mySQL = new MySQL();
    try {
      const userGetAllQuery = 'CALL user_get_all(?, ?, ?, ?, ?)';
      const [users] = await mySQL.query(userGetAllQuery, [sessionId, sort, size, offset, JSON.stringify(filter)]);
      const usersWithoutTotal = users.map((item) => ({ ...item, totalItems: undefined }));

      return {
        meta: {
          totalItems: users[0]?.totalItems || 0,
          size,
          offset,
          sort,
        },
        usersData: usersWithoutTotal,
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
      const [usersData] = await mySQL.query(userGetByIdsQuery, [sessionId, JSON.stringify(userIds), sort, size, offset]);
      const usersWithoutTotal = usersData.map((item) => ({ ...item, totalItems: undefined }));

      return {
        meta: {
          totalItems: usersData[0]?.totalItems || 0,
          size,
          offset,
          sort,
        },
        usersData: usersWithoutTotal,
      };
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

  public async userCreateOne({ name, email, password, token }) {
    const mySQL = new MySQL();
    try {
      const userCreateQuery = 'CALL user_create(?, ?, ?, ?)';
      const [[results]] = await mySQL.query(userCreateQuery, [name, email, password, token]);

      return results;
    } catch (err) {
      throw new RequestError('User creation failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userCreateConfirmation({ token }) {
    const mySQL = new MySQL();
    try {
      const userCreateQuery = 'CALL user_create_confirmation(?)';
      const [[results]] = await mySQL.query(userCreateQuery, [token]);

      return results;
    } catch (err) {
      throw new RequestError('User creation failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userUpdateOne({ userId, name, email, image, statement, location }) {
    const mySQL = new MySQL();
    try {
      const userUpdateQuery = 'CALL user_update(?, ?, ?, ?, ?, ?)';
      const [[results]] = await mySQL.query(userUpdateQuery, [userId, name, email, image, statement, location]);

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

  public async userLogin({ nameOrEmail, password, userId = null }) {
    const mySQL = new MySQL();
    try {
      const userLoginQuery = 'CALL user_login(?, ?, ?)';

      const [[user]] = await mySQL.query(userLoginQuery, [nameOrEmail, password, userId]);

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

  public async userResetPassword({ name, token, newPassword }) {
    const mySQL = new MySQL();
    try {
      const userResetPasswordQuery = 'CALL user_reset_password(?, ?, ?)';
      const [[results]] = await mySQL.query(userResetPasswordQuery, [name, token, newPassword]);

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
      const [usersData] = await mySQL.query(userFollowingGetAllQuery, [sessionId, userId, sort, size, offset]);

      const usersWithoutTotal = usersData.map((item) => ({ ...item, totalItems: undefined }));

      return {
        meta: {
          totalItems: usersData[0]?.totalItems || 0,
          size,
          offset,
          sort,
        },
        usersData: usersWithoutTotal,
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
      const [[userData]] = await mySQL.query(userFollowingGetOneQuery, [userId, followedId]);

      return userData;
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

  public async userRecommended({ userId, size, offset, sort }) {
    const mySQL = new MySQL();
    try {
      const userRecommendedQuery = 'CALL user_recommended(?, ?, ?, ?)';
      const [bookmarks] = await mySQL.query(userRecommendedQuery, [userId, size, offset, sort]);
      const linksWithoutTotal = bookmarks.map((item) => ({ ...item, totalItems: undefined }));

      return {
        meta: {
          totalItems: bookmarks[0]?.totalItems || 0,
          size,
          offset,
          sort,
        },
        bookmarks: linksWithoutTotal,
      };
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
      const [usersData] = await mySQL.query(userFollowerGetAllQuery, [sessionId, userId, sort, size, offset]);

      const usersWithoutTotal = usersData.map((item) => ({ ...item, totalItems: undefined }));

      return {
        meta: {
          totalItems: usersData[0]?.totalItems || 0,
          size,
          offset,
          sort,
        },
        usersData: usersWithoutTotal,
      };
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userBookmarkGetAll({ sessionId, userId, sort, size, offset, filter }) {
    const mySQL = new MySQL();
    try {
      const userBookmarkGetAllQuery = 'CALL user_bookmark_get_all(?, ?, ?, ?, ?, ?)';
      const [bookmarks] = await mySQL.query(userBookmarkGetAllQuery, [sessionId, userId, sort, size, offset, JSON.stringify(filter)]);

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

  public async userBookmarkGetOneByBookmarkIdUserId({ sessionId, bookmarkId, userId }) {
    const mySQL = new MySQL();
    try {
      const userBookmarkGetOneByBookmarkIdUserIdQuery = 'CALL user_bookmark_get_one_by_id(?, ?, ?)';
      const [[results]] = await mySQL.query(userBookmarkGetOneByBookmarkIdUserIdQuery, [sessionId, bookmarkId, userId]);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userBookmarkGetOneByLinkIdUserId({ sessionId, linkId, userId }) {
    const mySQL = new MySQL();
    try {
      const userBookmarkGetOneByLinkIdUserIdQuery = 'CALL user_bookmark_get_one_by_link_user(?, ?, ?)';
      const [[results]] = await mySQL.query(userBookmarkGetOneByLinkIdUserIdQuery, [sessionId, linkId, userId]);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userBookmarkGetOneByUserIdPathDomain({ sessionId, userId, domain, path }) {
    const mySQL = new MySQL();
    try {
      const userBookmarkGetOneByLinkIdUserIdQuery = 'CALL user_bookmark_get_one_by_user_path_domain(?, ?, ?, ?)';
      const [[results]] = await mySQL.query(userBookmarkGetOneByLinkIdUserIdQuery, [sessionId, userId, domain, path]);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userBookmarkCreate({ userId, linkId, title, isPrivate, tags }) {
    const mySQL = new MySQL();

    try {
      const userBookmarkCreateQuery = 'CALL user_bookmark_create(?, ?, ?, ?, ?)';

      const [[results]] = await mySQL.query(userBookmarkCreateQuery, [userId, linkId, title, isPrivate, JSON.stringify(tags)]);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userBookmarkUpdate({ bookmarkId, order, title, isPrivate, tags }) {
    const mySQL = new MySQL();

    try {
      const userBookmarkUpdateQuery = 'CALL user_bookmark_update(?, ?, ?, ?, ?)';

      const [[results]] = await mySQL.query(userBookmarkUpdateQuery, [bookmarkId, order, title, isPrivate, JSON.stringify(tags)]);

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
      const resultsWithoutTotal = results.map((item) => ({
        ...item,
        totalItems: undefined,
      }));

      return {
        meta: {
          totalItems: results[0]?.totalItems || 0,
          size,
          offset,
          sort,
        },
        tags: resultsWithoutTotal,
      };
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userForgotPassword({ userId, token }) {
    const mySQL = new MySQL();

    try {
      const userTagsGetAllQuery = 'CALL user_forgot_password(?, ?)';

      const [[results]] = await mySQL.query(userTagsGetAllQuery, [userId, token]);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userBookmarkUserCreate({ sessionId, bookmarkId, userId }) {
    const mySQL = new MySQL();

    try {
      const userBookmarkUserCreateQuery = 'CALL user_bookmark_user_create(?, ?, ?)';

      const [[results]] = await mySQL.query(userBookmarkUserCreateQuery, [sessionId, bookmarkId, userId]);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userBookmarkUserUpdate({ bookmarkId, userId, viewed }) {
    const mySQL = new MySQL();

    try {
      const userBookmarkUserCreateQuery = 'CALL user_bookmark_user_update(?, ?, ?)';

      const [[results]] = await mySQL.query(userBookmarkUserCreateQuery, [bookmarkId, userId, viewed]);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userBookmarkUserReceivedGetAll({ sessionId, sort, size, offset, filter }) {
    const mySQL = new MySQL();

    try {
      const query = 'CALL user_bookmark_user_received_get_all(?, ?, ?, ?, ?)';

      const [results] = await mySQL.query(query, [sessionId, sort, size, offset, JSON.stringify(filter)]);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userBookmarkUserSentGetAll({ sessionId, sort, size, offset, filter }) {
    const mySQL = new MySQL();

    try {
      const query = 'CALL user_bookmark_user_sent_get_all(?, ?, ?, ?, ?)';

      const [results] = await mySQL.query(query, [sessionId, sort, size, offset, JSON.stringify(filter)]);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }
}
