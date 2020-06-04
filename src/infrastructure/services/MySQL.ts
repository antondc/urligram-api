import util from 'util';
import mysql from 'mysql';
import config from '@root/config.test.json';

export class MySQL {
  private mySQL;

  constructor(options: { multipleStatements?: boolean } = { multipleStatements: false }) {
    const { multipleStatements } = options;

    this.mySQL = mysql.createConnection({
      ...config[process.env.NODE_ENV].database,
      multipleStatements,
    });
  }

  query(sql: string, args?: string | number | [] | {}) {
    return util.promisify(this.mySQL.query).call(this.mySQL, sql, args);
  }

  close() {
    return util.promisify(this.mySQL.end).call(this.mySQL);
  }

  beginTransaction() {
    return util.promisify(this.mySQL.beginTransaction).call(this.mySQL);
  }

  commit() {
    return util.promisify(this.mySQL.commit).call(this.mySQL);
  }

  rollback() {
    return util.promisify(this.mySQL.rollback).call(this.mySQL);
  }
}
