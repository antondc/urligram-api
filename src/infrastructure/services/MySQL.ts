// https://codeburst.io/node-js-mysql-and-async-await-6fb25b01b628

import util from 'util';
import mysql from 'mysql';
import config from '@root/config.test.json';

export class MySQL {
  private mySQL;

  constructor() {
    this.mySQL = mysql.createConnection(config[process.env.NODE_ENV].database);
  }

  query(sql: string, args: string | number | [] | {}) {
    return util.promisify(this.mySQL.query).call(this.mySQL, sql, args);
  }

  close() {
    return util.promisify(this.mySQL.end).call(this.mySQL);
  }
}
