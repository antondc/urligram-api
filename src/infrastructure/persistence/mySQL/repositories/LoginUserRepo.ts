import { ILoginUserRepo } from '@domain/user/repositories/ILoginUserRepo';
import { ILoginUserDTO } from '@domain/user/dto/ILoginUserDTO';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';

export class LoginUserRepo implements ILoginUserRepo {
  private mySQL: MySQL;

  constructor() {
    this.mySQL = new MySQL();
  }

  public async authenticateUser(loginUserDTO: ILoginUserDTO) {
    const authenticateUserQuery = `CALL authenticate_user('${JSON.stringify(loginUserDTO)}')`;
    const results = await this.mySQL.query(authenticateUserQuery);

    return results;
  }
}
