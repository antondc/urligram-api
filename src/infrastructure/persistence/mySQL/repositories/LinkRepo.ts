import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { BaseError } from '@shared/errors/BaseError';

export class LinkRepo implements ILinkRepo {
  public async linkGetOne(linkGetoneRequest) {
    const mySQL = new MySQL();

    try {
      const linkGetOneQuery = `CALL link_get_one('${JSON.stringify(linkGetoneRequest)}')`;

      const [[link]] = await mySQL.query(linkGetOneQuery);

      return link;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }
}
