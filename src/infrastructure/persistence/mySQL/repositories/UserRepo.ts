import { User } from '@domain/user/entities/User';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { BaseError } from '@shared/errors/BaseError';
import { RequestError } from '@shared/errors/RequestError';

export class UserRepo implements IUserRepo {
  public async create(createUserDTO): Promise<User> {
    const mySQL = new MySQL();
    try {
      const createUserQuery = `CALL users_create('${JSON.stringify(createUserDTO)}')`;
      const [[results]] = await mySQL.query(createUserQuery);

      return results;
    } catch (err) {
      throw new RequestError('User creation failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async getOne(findUserDTO): Promise<User> {
    const mySQL = new MySQL();
    try {
      const getOneUserQuery = `CALL users_get_one('${JSON.stringify(findUserDTO)}')`;
      const [[results]] = await mySQL.query(getOneUserQuery);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async getAll(): Promise<User[]> {
    const mySQL = new MySQL();
    try {
      const getAllUsersQuery = `CALL users_get_all()`;
      const [results] = await mySQL.query(getAllUsersQuery);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async getFollowing(findUserDTO): Promise<User> {
    const mySQL = new MySQL();
    try {
      const getFollowingQuery = `CALL users_get_following('${JSON.stringify(findUserDTO)}')`;
      const [[results]] = await mySQL.query(getFollowingQuery);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async getFollowers(findUserDTO): Promise<User> {
    const mySQL = new MySQL();
    try {
      const getFollowersQuery = `CALL users_get_followers('${JSON.stringify(findUserDTO)}')`;
      const [[results]] = await mySQL.query(getFollowersQuery);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async followUser(followUserDTO): Promise<User> {
    const mySQL = new MySQL();
    try {
      const followUserQuery = `CALL users_follow('${JSON.stringify(followUserDTO)}')`;
      const [[results]] = await mySQL.query(followUserQuery);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async followDeleteUser(followDeleteUserDTO): Promise<User> {
    const mySQL = new MySQL();
    try {
      const followDeleteUserQuery = `CALL users_follow_delete('${JSON.stringify(followDeleteUserDTO)}')`;
      const [[results]] = await mySQL.query(followDeleteUserQuery);

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async authenticate(loginUserDTO): Promise<User> {
    const mySQL = new MySQL();
    try {
      const authenticateUserQuery = `CALL users_authenticate('${JSON.stringify(loginUserDTO)}')`;

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
