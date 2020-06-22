import { User } from '@domain/user/entities/User';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { BaseError } from '@shared/errors/BaseError';
import { RequestError } from '@shared/errors/RequestError';

export class UserRepo implements IUserRepo {
  public async create(createUserDTO): Promise<User> {
    const mySQL = new MySQL();
    try {
      const createPostQuery = `CALL create_user('${JSON.stringify(createUserDTO)}')`;
      const [[results]] = await mySQL.query(createPostQuery);

      return results;
    } catch (err) {
      throw new RequestError('User creation failed', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async find(findUserDTO): Promise<User> {
    const mySQL = new MySQL();
    try {
      const findUserQuery = `CALL find_user('${JSON.stringify(findUserDTO)}')`;
      const [[results]] = await mySQL.query(findUserQuery);

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
      const authenticateUserQuery = `CALL authenticate_user('${JSON.stringify(loginUserDTO)}')`;

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
      const logSessionQuery = `CALL log_user_session('${JSON.stringify(sessionLogData)}')`;

      await mySQL.query(logSessionQuery);

      return null;
    } catch (err) {
      throw new BaseError('Error loging user session', 401, err);
    } finally {
      await mySQL.close();
    }
  }
}
