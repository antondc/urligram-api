import mysql from 'mysql2';
import config from '@root/config.test.json';
import { ICreateUserRepo } from '@application/ICreateUserRepo';
import { ICreateUserDTO } from '@root/src/application/ICreateUserDTO';

export class CreateUserRepo implements ICreateUserRepo {
  mySQL: mysql;

  constructor() {
    this.mySQL = mysql.createConnection(config[process.env.NODE_ENV].database);
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
