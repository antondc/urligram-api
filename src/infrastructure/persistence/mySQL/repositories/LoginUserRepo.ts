import { ILoginUserRepo } from '@domain/user/repositories/ILoginUserRepo';
import { ILoginUserRequestDTO } from '@domain/user/dto/ILoginUserRequestDTO';
import { ILoginUserResponseDTO } from '@domain/user/dto/ILoginUserResponseDTO';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { RequestError } from '@root/src/shared/errors/RequestError';

export class LoginUserRepo implements ILoginUserRepo {
  private mySQL: MySQL;

  constructor() {
    this.mySQL = new MySQL();
  }

  public async authenticateUser(loginUserDTO: ILoginUserRequestDTO): Promise<ILoginUserResponseDTO> {
    const authenticateUserQuery = `CALL authenticate_user('${JSON.stringify(loginUserDTO)}')`;

    const [[user]] = await this.mySQL.query(authenticateUserQuery);
    await this.mySQL.close();

    if (!user) throw new RequestError('Email or user incorrect', 401);

    return user;
  }
}
