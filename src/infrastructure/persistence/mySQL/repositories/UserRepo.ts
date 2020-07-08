import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { BaseError } from '@shared/errors/BaseError';
import { RequestError } from '@shared/errors/RequestError';

export class UserRepo implements IUserRepo {
  public async userGetOne(userGetOneDTO) {
    const mySQL = new MySQL();
    try {
      const userGetOneQuery = `CALL user_get_one('${JSON.stringify(userGetOneDTO)}')`;
      const [[results]] = await mySQL.query(userGetOneQuery);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

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

  public async userCreate(userCreateDTO) {
    const mySQL = new MySQL();
    try {
      const userCreateQuery = `CALL user_create('${JSON.stringify(userCreateDTO)}')`;
      const [[results]] = await mySQL.query(userCreateQuery);

      return results;
    } catch (err) {
      throw new RequestError('User creation failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userUpdate(userUpdateDTO) {
    const mySQL = new MySQL();
    try {
      const userUpdateQuery = `CALL user_update('${JSON.stringify(userUpdateDTO)}')`;
      const [[results]] = await mySQL.query(userUpdateQuery);

      return results;
    } catch (err) {
      throw new RequestError('User update failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userDeleteMe(userDeleteMeDTO) {
    const mySQL = new MySQL();
    try {
      const userDeleteMeQuery = `CALL user_delete_me('${JSON.stringify(userDeleteMeDTO)}')`;
      const [[results]] = await mySQL.query(userDeleteMeQuery);

      return results;
    } catch (err) {
      throw new RequestError('User update failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userUpdatePassword(userUpdatePasswordDTO) {
    const mySQL = new MySQL();
    try {
      const userUpdatePasswordQuery = `CALL user_update_password('${JSON.stringify(userUpdatePasswordDTO)}')`;
      const [[results]] = await mySQL.query(userUpdatePasswordQuery);

      return results;
    } catch (err) {
      throw new RequestError('User update failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userLinkGetAll(userLinkGetAllDTO) {
    const mySQL = new MySQL();
    try {
      const userLinkGetAllQuery = `CALL user_link_get_all('${JSON.stringify(userLinkGetAllDTO)}')`;
      const [results] = await mySQL.query(userLinkGetAllQuery);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userListGetAll(userListGetAllDTO) {
    const mySQL = new MySQL();
    try {
      const userListGetAllQuery = `CALL user_list_get_all('${JSON.stringify(userListGetAllDTO)}')`;
      const [results] = await mySQL.query(userListGetAllQuery);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userListMeGetAll(userListMeGetAllDTO) {
    const mySQL = new MySQL();
    try {
      const userListMeGetAllQuery = `CALL user_list_me_get_all('${JSON.stringify(userListMeGetAllDTO)}')`;
      const [results] = await mySQL.query(userListMeGetAllQuery);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userFollowingGetAll(findUserDTO) {
    const mySQL = new MySQL();
    try {
      const followingGetAllQuery = `CALL user_following_get_all('${JSON.stringify(findUserDTO)}')`;
      const [[results]] = await mySQL.query(followingGetAllQuery);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userFollowersGetAll(userFollowersGetAllDTO) {
    const mySQL = new MySQL();
    try {
      const userFollowersGetAllQuery = `CALL user_followers_get_all('${JSON.stringify(userFollowersGetAllDTO)}')`;
      const [[results]] = await mySQL.query(userFollowersGetAllQuery);

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

  public async authenticate(userLoginDTO) {
    const mySQL = new MySQL();
    try {
      const authenticateUserQuery = `CALL user_authenticate('${JSON.stringify(userLoginDTO)}')`;

      const [[user]] = await mySQL.query(authenticateUserQuery);

      return user;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async logSession(sessionLogData) {
    const mySQL = new MySQL();
    try {
      const logSessionQuery = `CALL user_log_session('${JSON.stringify(sessionLogData)}')`;

      await mySQL.query(logSessionQuery);

      return null;
    } catch (err) {
      throw new BaseError('Error loging user session', 401, err);
    } finally {
      await mySQL.close();
    }
  }
}
