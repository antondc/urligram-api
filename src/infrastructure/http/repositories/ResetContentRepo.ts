import fs from 'fs';
import path from 'path';

import { MySQL } from '@infrastructure/services/MySQL';

export class ResetContentRepo {
  private mySQL: MySQL;
  private models: string;

  constructor() {
    this.mySQL = new MySQL({ multipleStatements: true });
    this.models = fs.readFileSync(path.resolve(__dirname, '../../database/mySQL/modelsDb.sql')).toString();
  }

  public async reset() {
    try {
      const results = await this.mySQL.query(this.models);

      return results;
    } catch (err) {
      console.log(err);
    } finally {
      await this.mySQL.close();
    }
  }
}
