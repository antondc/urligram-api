import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';

export class HealthCheckRepo {
  private mySQL: MySQL;

  constructor() {
    this.mySQL = new MySQL();
  }

  public async test() {
    const response = await this.mySQL.query('SELECT version()');
    await this.mySQL.close();

    return response;
  }
}
