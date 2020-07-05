import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { BaseError } from '@shared/errors/BaseError';
import { RequestError } from '@shared/errors/RequestError';

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

  public async linkCreate(linkCreateRequestDTO) {
    const mySQL = new MySQL();

    try {
      const linkCreateQuery = `CALL link_create('${JSON.stringify(linkCreateRequestDTO)}')`;

      const [[results]] = await mySQL.query(linkCreateQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async linkUpdate(linkUpdateRequestDTO) {
    const mySQL = new MySQL();

    try {
      const linkUpdateQuery = `CALL link_update('${JSON.stringify(linkUpdateRequestDTO)}')`;

      const [[results]] = await mySQL.query(linkUpdateQuery);

      return results;
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

  public async linkDelete(linkDeleteRequestDTO) {
    const mySQL = new MySQL();

    try {
      const linkDeleteQuery = `CALL link_delete('${JSON.stringify(linkDeleteRequestDTO)}')`;

      const [[results]] = await mySQL.query(linkDeleteQuery);

      const result = {
        success: true,
        message: 'Link removed',
        affectedRows: results.id,
      };

      return result;
    } catch (err) {
      if (err instanceof RequestError) throw err;

      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }
}
