import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { ILinkGetAllRequest } from '@domain/link/repositories/interfaces/ILinkGetAllRequest';
import { ILinkGetAllResponse } from '@domain/link/repositories/interfaces/ILinkGetAllResponse';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { BaseError } from '@shared/errors/BaseError';

export class LinkRepo implements ILinkRepo {
  public async linkGetOne({ sessionId, linkId = null, path = null, domain = null }) {
    const mySQL = new MySQL();

    try {
      const linkGetOneQuery = 'CALL link_get_one(?, ?, ?, ?)';

      const [[link]] = await mySQL.query(linkGetOneQuery, [sessionId, linkId, path, domain]);

      return link;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async linkGetAll({ sessionId, sort, size, offset, filter }: ILinkGetAllRequest): Promise<ILinkGetAllResponse> {
    const mySQL = new MySQL();

    try {
      const linkGetAllQuery = 'CALL link_get_all(?, ?, ?, ?, ?)';

      const [links] = await mySQL.query(linkGetAllQuery, [sessionId, sort, size, offset, JSON.stringify(filter)]);

      const resultsWithoutTotal = links.map((item) => ({
        ...item,
        totalItems: undefined,
      }));

      return {
        meta: {
          totalItems: links[0]?.totalItems || 0,
          size,
          offset,
          sort,
          filter,
        },
        links: resultsWithoutTotal,
      };
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

  public async linkNotesGetAll({ linkId }) {
    const mySQL = new MySQL();

    try {
      const linkNotesGetAllQuery = 'CALL link_notes_get_all_public(?)';

      const [results] = await mySQL.query(linkNotesGetAllQuery, [linkId]);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async linkUsersGetAll({ linkId }) {
    const mySQL = new MySQL();

    try {
      const linkUsersGetAllQuery = 'CALL link_users_get_all_public(?)';

      const [results] = await mySQL.query(linkUsersGetAllQuery, [linkId]);

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

  public async linkUpsertOne({ path, domain, title, description, image, favicon, language }) {
    const mySQL = new MySQL();

    try {
      const linkUpsertOneQuery = 'CALL link_upsert_one(?, ?, ?, ?, ?, ?, ?)';

      const [[results]] = await mySQL.query(linkUpsertOneQuery, [path, domain, title, description, image, favicon, language]);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }
}
