import mysql from 'mysql2';
import { promisify } from 'util';

import { DATABASE_SETTINGS } from '@shared/constants/env';

export class MySQL {
  private mySQL;

  constructor(options: { multipleStatements?: boolean } = { multipleStatements: false }) {
    const { multipleStatements } = options;

    this.mySQL = mysql.createConnection({
      ...DATABASE_SETTINGS,
      multipleStatements,
    });
  }

  query(sql: string, args?: string | number | [] | {}) {
    return promisify(this.mySQL.query).call(this.mySQL, sql, args);
  }

  close() {
    return promisify(this.mySQL.end).call(this.mySQL);
  }

  beginTransaction() {
    return promisify(this.mySQL.beginTransaction).call(this.mySQL);
  }

  commit() {
    return promisify(this.mySQL.commit).call(this.mySQL);
  }

  rollback() {
    return promisify(this.mySQL.rollback).call(this.mySQL);
  }
}
