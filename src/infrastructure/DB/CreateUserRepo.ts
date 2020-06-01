import mysql from 'mysql2';
import config from 'Root/config.test.json';
import { ICreateUserRepo } from 'Application/ICreateUserRepo';
import { ICreateUserDTO } from 'Root/src/application/ICreateUserDTO';

export class CreateUserRepo implements ICreateUserRepo {
  mySQL: mysql;

  constructor() {
    this.mySQL = mysql.createConnection(config.database);
  }

  public save(createUserDTO: ICreateUserDTO) {
    const insertPostQuery = `CALL insert_user('${JSON.stringify(createUserDTO)}')`;

    this.mySQL.connect();

    this.mySQL.query(insertPostQuery, (error, results) => {
      console.log(JSON.stringify(results, null, 4));
      this.mySQL.end();

      return;
    });
  }
}
