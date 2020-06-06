import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';

export class HealthCheckRepo {
  private mySQL: MySQL;

  constructor() {
    this.mySQL = new MySQL();
  }

  public async test() {
    try {
      const results = await this.mySQL.query('SELECT version()');

      return results;
    } catch (err) {
      console.log(err);
    } finally {
      await this.mySQL.close();
    }
  }
}
