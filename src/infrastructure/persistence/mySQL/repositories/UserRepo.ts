import { User } from '@domain/user/entities/User';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { BaseError } from '@shared/errors/BaseError';
import { RequestError } from '@shared/errors/RequestError';

export class UserRepo implements IUserRepo {
  public async userCreate(userCreateDTO): Promise<User> {
    const mySQL = new MySQL();
    try {
      const userCreateQuery = `CALL users_create('${JSON.stringify(userCreateDTO)}')`;
      const [[results]] = await mySQL.query(userCreateQuery);

      return results;
    } catch (err) {
      throw new RequestError('User creation failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userGetOne(userGetOneDTO): Promise<User> {
    const mySQL = new MySQL();
    try {
      const userGetOneQuery = `CALL users_get_one('${JSON.stringify(userGetOneDTO)}')`;
      const [[results]] = await mySQL.query(userGetOneQuery);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userGetAll(): Promise<User[]> {
    const mySQL = new MySQL();
    try {
      const userGetAllQuery = `CALL users_get_all()`;
      const [results] = await mySQL.query(userGetAllQuery);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userFollowingGetAll(findUserDTO): Promise<User> {
    const mySQL = new MySQL();
    try {
      const followingGetAllQuery = `CALL users_get_following('${JSON.stringify(findUserDTO)}')`;
      const [[results]] = await mySQL.query(followingGetAllQuery);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userFollowersGetAll(userFollowersGetAllDTO): Promise<User> {
    const mySQL = new MySQL();
    try {
      const userFollowersGetAllQuery = `CALL users_get_followers('${JSON.stringify(userFollowersGetAllDTO)}')`;
      const [[results]] = await mySQL.query(userFollowersGetAllQuery);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userFollowingCreate(userFollowingCreateDTO): Promise<User> {
    const mySQL = new MySQL();
    try {
      const userFollowingQuery = `CALL users_follow('${JSON.stringify(userFollowingCreateDTO)}')`;
      const [[results]] = await mySQL.query(userFollowingQuery);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async userFollowingDelete(userFollowingDeleteDTO): Promise<User> {
    const mySQL = new MySQL();
    try {
      const userFollowingDeleteQuery = `CALL users_follow_delete('${JSON.stringify(userFollowingDeleteDTO)}')`;
      const [[results]] = await mySQL.query(userFollowingDeleteQuery);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async authenticate(userLoginDTO): Promise<User> {
    const mySQL = new MySQL();
    try {
      const authenticateUserQuery = `CALL users_authenticate('${JSON.stringify(userLoginDTO)}')`;

      const [[user]] = await mySQL.query(authenticateUserQuery);

      return user;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async logSession(sessionLogData): Promise<void> {
    const mySQL = new MySQL();
    try {
      const logSessionQuery = `CALL users_log_session('${JSON.stringify(sessionLogData)}')`;

      await mySQL.query(logSessionQuery);

      return null;
    } catch (err) {
      throw new BaseError('Error loging user session', 401, err);
    } finally {
      await mySQL.close();
    }
  }
}
