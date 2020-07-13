import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { BaseError } from '@shared/errors/BaseError';

export class LinkRepo implements ILinkRepo {
  public async linkGetOne(linkGetoneRequestDTO) {
    const mySQL = new MySQL();

    try {
      const linkGetOneQuery = `CALL link_get_one('${JSON.stringify(linkGetoneRequestDTO)}')`;

      const [[link]] = await mySQL.query(linkGetOneQuery);

      return link;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async linkGetAll() {
    const mySQL = new MySQL();

    try {
      const linkGetAllQuery = `CALL link_get_all()`;

      const [links] = await mySQL.query(linkGetAllQuery);

      return links;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async linkListGetAll(linkListGetAllRequestDTO) {
    const mySQL = new MySQL();

    try {
      const linkListGetAllQuery = `CALL link_list_get_all('${JSON.stringify(linkListGetAllRequestDTO)}')`;

      const [results] = await mySQL.query(linkListGetAllQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async linkTagGetAll(linkTagGetAllRequestDTO) {
    const mySQL = new MySQL();

    try {
      const linkTagGetAllQuery = `CALL link_tag_get_all('${JSON.stringify(linkTagGetAllRequestDTO)}')`;

      const [results] = await mySQL.query(linkTagGetAllQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }
}
