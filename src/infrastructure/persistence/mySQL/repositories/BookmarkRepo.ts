import { IBookmarkRepo } from '@domain/bookmark/repositories/IBookmarkRepo';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { BaseError } from '@shared/errors/BaseError';

export class BookmarkRepo implements IBookmarkRepo {
  public async bookmarkGetOne({ bookmarkId }) {
    const mySQL = new MySQL();

    try {
      const bookmarkGetOneQuery = `CALL bookmark_get_one(?)`;

      const [[bookmark]] = await mySQL.query(bookmarkGetOneQuery, [bookmarkId]);

      return bookmark;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async bookmarkTagGetAll({ bookmarkId }) {
    const mySQL = new MySQL();

    try {
      const bookmarkTagGetAllQuery = `CALL bookmark_tag_get_all(?)`;

      const [response] = await mySQL.query(bookmarkTagGetAllQuery, [bookmarkId]);

      return response;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async bookmarkGetAllPublic() {
    const mySQL = new MySQL();

    try {
      const bookmarkGetAllPublicQuery = `CALL bookmark_get_all_public()`;

      const [bookmark] = await mySQL.query(bookmarkGetAllPublicQuery);

      return bookmark;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async bookmarkListGetAll({ bookmarkId }) {
    const mySQL = new MySQL();

    try {
      const bookmarkListGetAllQuery = `CALL bookmark_list_get_all(?)`;

      const [response] = await mySQL.query(bookmarkListGetAllQuery, [bookmarkId]);

      return response;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async bookmarkGetAllByLinkId({ linkId, userId }) {
    const mySQL = new MySQL();

    try {
      const bookmarkGetAllByLinkIdQuery = `CALL bookmark_get_all_by_link_id(?, ?)`;

      const [response] = await mySQL.query(bookmarkGetAllByLinkIdQuery, [linkId, userId]);

      return response;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }
}
