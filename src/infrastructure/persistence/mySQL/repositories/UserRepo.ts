import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { RequestError } from '@shared/errors/RequestError';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { ICreateUserRequestDTO } from '@domain/user/dto/ICreateUserRequestDTO';
import { ICreateUserResponseDTO } from '@domain/user/dto/ICreateUserResponseDTO';
import { IFindUserRequestDTO } from '@domain/user/dto/IFindUserRequestDTO';
import { IFindUserResponseDTO } from '@domain/user/dto/IFindUserResponseDTO';
import { ILoginUserRequestDTO } from '@domain/user/dto/ILoginUserRequestDTO';
import { ILoginUserResponseDTO } from '@domain/user/dto/ILoginUserResponseDTO';
import { ILogOutUserRequestDTO } from '@domain/user/dto/ILogOutUserRequestDTO';
import { ILogOutUserResponseDTO } from '@domain/user/dto/ILogOutUserResponseDTO';
import { AuthenticationError } from '@shared/errors/AuthenticationError';

export class UserRepo implements IUserRepo {
  public async create(createUserDTO: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO> {
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

  public async find(findUserDTO: IFindUserRequestDTO): Promise<IFindUserResponseDTO> {
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

  public async authenticate(loginUserDTO: ILoginUserRequestDTO): Promise<ILoginUserResponseDTO> {
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

  public async deauthenticate(logOutUserRequestDTO: ILogOutUserRequestDTO): Promise<ILogOutUserResponseDTO> {
    const mySQL = new MySQL();
    try {
      const deauthenticateUserQuery = `CALL deauthenticate_user('${JSON.stringify(logOutUserRequestDTO)}')`;
      await mySQL.query(deauthenticateUserQuery);

      return logOutUserRequestDTO;
    } catch (err) {
      throw new AuthenticationError('Error deauthenticating user', 401, err);
    } finally {
      await mySQL.close();
    }
  }
}
