import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { BaseError } from '@shared/errors/BaseError';
import { RequestError } from '@shared/errors/RequestError';

export class UserRepo implements IUserRepo {
  public async userGetAll() {
    const mySQL = new MySQL();
    try {
      const userGetAllQuery = `CALL user_get_all()`;
      const [results] = await mySQL.query(userGetAllQuery);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userGetOne(userGetOne) {
    const mySQL = new MySQL();
    try {
      const userGetOneQuery = `CALL user_get_one('${JSON.stringify(userGetOne)}')`;
      const [[results]] = await mySQL.query(userGetOneQuery);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userCreateOne(userCreateOne) {
    const mySQL = new MySQL();
    try {
      const userCreateQuery = `CALL user_create('${JSON.stringify(userCreateOne)}')`;
      const [[results]] = await mySQL.query(userCreateQuery);

      return results;
    } catch (err) {
      throw new RequestError('User creation failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userUpdateOne(userUpdateOne) {
    const mySQL = new MySQL();
    try {
      const userUpdateQuery = `CALL user_update('${JSON.stringify(userUpdateOne)}')`;
      const [[results]] = await mySQL.query(userUpdateQuery);

      return results;
    } catch (err) {
      throw new RequestError('User update failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userDeleteOne(userDeleteOne) {
    const mySQL = new MySQL();
    try {
      const userDeleteQuery = `CALL user_delete_one('${JSON.stringify(userDeleteOne)}')`;
      const [[results]] = await mySQL.query(userDeleteQuery);

      return results;
    } catch (err) {
      throw new RequestError('User update failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userLogin(userLogin) {
    const mySQL = new MySQL();
    try {
      const userLoginQuery = `CALL user_login('${JSON.stringify(userLogin)}')`;

      const [[user]] = await mySQL.query(userLoginQuery);

      return user;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userLogSession(userLogSession) {
    const mySQL = new MySQL();
    try {
      const logSessionQuery = `CALL user_log_session('${JSON.stringify(userLogSession)}')`;

      await mySQL.query(logSessionQuery);

      return null;
    } catch (err) {
      throw new BaseError('Error loging user session', 401, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userPasswordUpdate(userPasswordUpdateDTO) {
    const mySQL = new MySQL();
    try {
      const userPasswordUpdateQuery = `CALL user_password_update('${JSON.stringify(userPasswordUpdateDTO)}')`;
      const [[results]] = await mySQL.query(userPasswordUpdateQuery);

      return results;
    } catch (err) {
      throw new RequestError('User update failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userFollowingGetAll(userFollowingGetAllRequest) {
    const mySQL = new MySQL();
    try {
      const userFollowingGetAllQuery = `CALL user_following_get_all('${JSON.stringify(userFollowingGetAllRequest)}')`;
      const [results] = await mySQL.query(userFollowingGetAllQuery);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userFollowingGetOne(userFollowingGetOneRequest) {
    const mySQL = new MySQL();
    try {
      const userFollowingGetOneQuery = `CALL user_following_get_one('${JSON.stringify(userFollowingGetOneRequest)}')`;
      const [[results]] = await mySQL.query(userFollowingGetOneQuery);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userFollowingCreate(userFollowingCreateDTO) {
    const mySQL = new MySQL();
    try {
      const userFollowingQuery = `CALL user_following_create('${JSON.stringify(userFollowingCreateDTO)}')`;
      const [[results]] = await mySQL.query(userFollowingQuery);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userFollowingDelete(userFollowingDeleteDTO) {
    const mySQL = new MySQL();
    try {
      const userFollowingDeleteQuery = `CALL user_following_delete('${JSON.stringify(userFollowingDeleteDTO)}')`;
      const [[results]] = await mySQL.query(userFollowingDeleteQuery);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userFollowerGetAll(userFollowerGetAllDTO) {
    const mySQL = new MySQL();
    try {
      const userFollowerGetAllQuery = `CALL user_follower_get_all('${JSON.stringify(userFollowerGetAllDTO)}')`;
      const [[results]] = await mySQL.query(userFollowerGetAllQuery);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userBookmarkGetAll(userBookmarkGetAllDTO) {
    const mySQL = new MySQL();
    try {
      const userBookmarkGetAllQuery = `CALL user_bookmark_get_all('${JSON.stringify(userBookmarkGetAllDTO)}')`;
      const [results] = await mySQL.query(userBookmarkGetAllQuery);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userBookmarkGetOne(userBookmarkGetOneDTO) {
    const mySQL = new MySQL();
    try {
      const userBookmarkGetOneQuery = `CALL user_bookmark_get_one('${JSON.stringify(userBookmarkGetOneDTO)}')`;
      const [[results]] = await mySQL.query(userBookmarkGetOneQuery);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userBookmarkCreate(userBookmarkCreateRequest) {
    const mySQL = new MySQL();

    try {
      const userBookmarkCreateQuery = `CALL user_bookmark_create('${JSON.stringify(userBookmarkCreateRequest)}')`;

      const [[results]] = await mySQL.query(userBookmarkCreateQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }
}
