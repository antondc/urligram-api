import mysql from 'mysql2';
import { ICreateUserRepo } from 'Application/ICreateUserRepo';
import config from 'Root/config.test.json';
import { User } from 'Domain/User';

export class CreateUserRepo implements ICreateUserRepo {
  private user: User;
  mySQL: any;

  constructor(user: User) {
    this.user = user;

    this.mySQL = mysql.createConnection(config.database);
  }

  public save() {
    const insertPostQuery = `CALL insert_user('${JSON.stringify(this.user)}')`;
    this.mySQL.connect();

    this.mySQL.query(insertPostQuery, (error, results) => {
      console.log(JSON.stringify(results, null, 4));
      this.mySQL.end();
    });
  }
}
