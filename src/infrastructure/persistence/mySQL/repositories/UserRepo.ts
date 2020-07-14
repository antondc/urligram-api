import { User } from '@domain/user/entities/User';
import { IUserCreateOneRequest } from '@domain/user/repositories/interfaces/IUserCreateOneRequest';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { RequestError } from '@shared/errors/RequestError';

export class UserRepo implements IUserRepo {
  userCreat: (userCreateRequest: IUserCreateOneRequest) => Promise<User>;
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

  public async userCreateOne(userCreateDTO) {
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
}
