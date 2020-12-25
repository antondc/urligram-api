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
      typeCast: this.typeCast,
    });
  }

  typeCast(field, useDefaultTypeCasting) {
    // We only want to cast TINY fields that have a single digit in them. If the field
    // has more than one integer, then we cannot assume it is supposed to be a Boolean.

    if (field.type === 'TINY' && field.length === 1) {
      const bytes = field.buffer(); // Extract value

      // If there are no bytes, we are at a NULL value
      if (!bytes) return;
      // Convert from ASCII to string, then to number and finally to boolean
      const value = Boolean(Number(String.fromCharCode(bytes[0])));

      return value;
    }

    return useDefaultTypeCasting();
  }

  query(sql: string, args?: unknown) {
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
