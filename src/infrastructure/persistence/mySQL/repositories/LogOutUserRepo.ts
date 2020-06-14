import { ILogOutUserRepo } from '@domain/user/repositories/ILogOutUserRepo';
import { ILogOutUserRequestDTO } from '@domain/user/dto/ILogOutUserRequestDTO';
import { ILogOutUserResponseDTO } from '@domain/user/dto/ILogOutUserResponseDTO';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { AuthenticationError } from '@shared/errors/AuthenticationError';

export class LogOutUserRepo implements ILogOutUserRepo {
  private mySQL: MySQL;

  constructor() {
    this.mySQL = new MySQL();
  }

  public async deauthenticate(logOutUserRequestDTO: ILogOutUserRequestDTO): Promise<ILogOutUserResponseDTO> {
    try {
      const deauthenticateUserQuery = `CALL deauthenticate_user('${JSON.stringify(logOutUserRequestDTO)}')`;
      await this.mySQL.query(deauthenticateUserQuery);

      return logOutUserRequestDTO;
    } catch (err) {
      throw new AuthenticationError('Error deauthenticating user', 401, err);
    } finally {
      await this.mySQL.close();
    }
  }
}
