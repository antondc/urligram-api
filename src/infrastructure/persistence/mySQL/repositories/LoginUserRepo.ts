import { ILoginUserRepo } from '@domain/user/repositories/ILoginUserRepo';
import { ILoginUserDTO } from '@domain/user/dto/ILoginUserDTO';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { RequestError } from '@root/src/shared/errors/RequestError';

export class LoginUserRepo implements ILoginUserRepo {
  private mySQL: MySQL;

  constructor() {
    this.mySQL = new MySQL();
  }

  public async authenticateUser(loginUserDTO: ILoginUserDTO): Promise<ILoginUserDTO> {
    const authenticateUserQuery = `CALL authenticate_user('${JSON.stringify(loginUserDTO)}')`;

    const [[user]] = await this.mySQL.query(authenticateUserQuery);
    await this.mySQL.close();

    if (!user) throw new RequestError('Email or user incorrect', 401);

    return user;
  }
}
