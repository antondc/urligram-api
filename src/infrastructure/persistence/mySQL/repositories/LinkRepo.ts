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

  public async linkGetAllPublic(linkGetAllPublicRequest) {
    const mySQL = new MySQL();

    try {
      const linkGetAllPublicQuery = `CALL link_get_all_public('${JSON.stringify(linkGetAllPublicRequest)}')`;

      const [link] = await mySQL.query(linkGetAllPublicQuery);

      return link;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async linkListGetAllPublic(linkListGetAllPublicRequest) {
    const mySQL = new MySQL();

    try {
      const linkListGetAllPublicQuery = `CALL link_list_get_all_public('${JSON.stringify(linkListGetAllPublicRequest)}')`;

      const [results] = await mySQL.query(linkListGetAllPublicQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async linkTagGetAll(linkTagGetAllRequest) {
    const mySQL = new MySQL();

    try {
      const linkTagGetAllQuery = `CALL link_tag_get_all('${JSON.stringify(linkTagGetAllRequest)}')`;

      const [results] = await mySQL.query(linkTagGetAllQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async linkGetVotes(linkGetVotesRequest) {
    const mySQL = new MySQL();

    try {
      const linkGetVotesQuery = `CALL link_get_votes('${JSON.stringify(linkGetVotesRequest)}')`;

      const [results] = await mySQL.query(linkGetVotesQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }
}
