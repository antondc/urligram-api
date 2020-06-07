import { ICreateUserRepo } from '@domain/user/repositories/ICreateUserRepo';
import { ICreateUserDTO } from '@domain/user/dto/ICreateUserDTO';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';

export class CreateUserRepo implements ICreateUserRepo {
  private mySQL: MySQL;

  constructor() {
    this.mySQL = new MySQL();
  }

  public async save(createUserDTO: ICreateUserDTO) {
    const insertPostQuery = `CALL insert_user('${JSON.stringify(createUserDTO)}')`;
    const results = await this.mySQL.query(insertPostQuery);

    return results;
  }
}
