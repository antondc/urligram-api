import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { BaseError } from '@shared/errors/BaseError';

export class LinkRepo implements ILinkRepo {
  private mySQL: MySQL;

  constructor() {
    this.mySQL = new MySQL();
  }

  public async linkGetOne(linkGetoneRequestDTO) {
    try {
      const linkGetOneQuery = `CALL link_get_one('${JSON.stringify(linkGetoneRequestDTO)}')`;

      const [[link]] = await this.mySQL.query(linkGetOneQuery);

      return link;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await this.mySQL.close();
    }
  }

  public async linkGetAll() {
    try {
      const linkGetOneQuery = `CALL link_get_all()`;

      const [links] = await this.mySQL.query(linkGetOneQuery);

      return links;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await this.mySQL.close();
    }
  }
}
