import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { BaseError } from '@shared/errors/BaseError';

export class LinkRepo implements ILinkRepo {
  public async linkGetOne({ linkId = null, userId, path = null, domain = null }) {
    const mySQL = new MySQL();

    try {
      const linkGetOneQuery = 'CALL link_get_one(?, ?, ?, ?)';

      const [[link]] = await mySQL.query(linkGetOneQuery, [linkId, userId, path, domain]);

      return link;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async linkGetAllPublic() {
    const mySQL = new MySQL();

    try {
      const linkGetAllPublicQuery = 'CALL link_get_all_public()';

      const [link] = await mySQL.query(linkGetAllPublicQuery);

      return link;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async linkVoteOne({ linkId, userId, vote }) {
    const mySQL = new MySQL();

    try {
      const linkVoteOnePublicQuery = 'CALL link_vote_one(?, ?, ?)';
      const [[link]] = await mySQL.query(linkVoteOnePublicQuery, [linkId, userId, vote]);

      return link;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async linkListGetAllPublic({ linkId }) {
    const mySQL = new MySQL();

    try {
      const linkListGetAllPublicQuery = 'CALL link_list_get_all_public(?)';

      const [results] = await mySQL.query(linkListGetAllPublicQuery, [linkId]);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async linkTagGetAll({ linkId }) {
    const mySQL = new MySQL();

    try {
      const linkTagGetAllQuery = 'CALL link_tag_get_all(?)';

      const [results] = await mySQL.query(linkTagGetAllQuery, [linkId]);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async linkGetVotes({ linkId }) {
    const mySQL = new MySQL();

    try {
      const linkGetVotesQuery = 'CALL link_get_votes(?)';

      const [results] = await mySQL.query(linkGetVotesQuery, [linkId]);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }
}
