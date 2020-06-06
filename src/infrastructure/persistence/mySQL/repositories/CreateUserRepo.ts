import { ICreateUserRepo } from '@application/ICreateUserRepo';
import { ICreateUserDTO } from '@application/ICreateUserDTO';
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
