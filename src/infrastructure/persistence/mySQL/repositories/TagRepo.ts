import { ITagRepo } from '@domain/tag/repositories/ITagRepo';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { BaseError } from '@shared/errors/BaseError';

export class TagRepo implements ITagRepo {
  public async tagGetAll() {
    const mySQL = new MySQL();

    try {
      const tagGetAllQuery = `CALL tag_get_all()`;

      const [tags] = await mySQL.query(tagGetAllQuery);

      return tags;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async tagListGetAllPublic({ tagId }) {
    const mySQL = new MySQL();

    try {
      const tagListGetAllPublicQuery = `CALL tag_list_get_all(?)`;

      const [results] = await mySQL.query(tagListGetAllPublicQuery, [tagId]);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async tagBookmarkGetAllPublic({ tagId }) {
    const mySQL = new MySQL();

    try {
      const tagBookmarkGetAllPublicQuery = `CALL tag_bookmark_get_all(?)`;

      const [results] = await mySQL.query(tagBookmarkGetAllPublicQuery, [tagId]);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async tagUserGetAllPublic({ tagId }) {
    const mySQL = new MySQL();

    try {
      const tagUserGetAllPublicQuery = `CALL tag_user_get_all(?)`;

      const [results] = await mySQL.query(tagUserGetAllPublicQuery, [tagId]);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }
}
