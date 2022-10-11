import { IBookmarkRepo } from '@domain/bookmark/repositories/IBookmarkRepo';
import { IBookmarkGetAllPublicRequest } from '@domain/bookmark/repositories/interfaces/IBookmarkGetAllPublicRequest';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { BaseError } from '@shared/errors/BaseError';

export class BookmarkRepo implements IBookmarkRepo {
  public async bookmarkGetOne({ sessionId, bookmarkId }) {
    const mySQL = new MySQL();

    try {
      const bookmarkGetOneQuery = 'CALL bookmark_get_one(?, ?)';

      const [[bookmark]] = await mySQL.query(bookmarkGetOneQuery, [sessionId, bookmarkId]);

      return bookmark;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async bookmarkGetOneByLinkUser({ userId, linkId }) {
    const mySQL = new MySQL();

    try {
      const bookmarkGetOneQuery = 'CALL bookmark_get_one_by_link_user(?, ?)';

      const [[bookmark]] = await mySQL.query(bookmarkGetOneQuery, [userId, linkId]);

      return bookmark;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async bookmarkGetDefaultByLink({ userId, linkId }) {
    const mySQL = new MySQL();

    try {
      const bookmarkGetOneQuery = 'CALL bookmark_get_default_by_link(?, ?)';

      const [[bookmark]] = await mySQL.query(bookmarkGetOneQuery, [userId, linkId]);

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
      const bookmarkTagGetAllQuery = 'CALL bookmark_tag_get_all(?)';

      const [response] = await mySQL.query(bookmarkTagGetAllQuery, [bookmarkId]);

      return response;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async bookmarkGetAllPublic({ sessionId, sort, size = 10, offset, filter }: IBookmarkGetAllPublicRequest) {
    const mySQL = new MySQL();

    try {
      const bookmarkGetAllPublicQuery = 'CALL bookmark_get_all_public(?, ?, ?, ?, ?)';
      const [bookmarks] = await mySQL.query(bookmarkGetAllPublicQuery, [sessionId, sort, size, offset, JSON.stringify(filter)]);

      const resultsWithoutTotal = bookmarks.map((item) => ({
        ...item,
        totalItems: undefined,
      }));

      return {
        meta: {
          totalItems: bookmarks[0]?.totalItems || 0,
          size,
          offset,
          sort,
          filter,
        },
        bookmarks: resultsWithoutTotal,
      };
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async bookmarkGetByIds({ sessionId, ids }) {
    const mySQL = new MySQL();

    try {
      const bookmarkGetByIdsQuery = 'CALL bookmark_get_by_ids(?, ?)';
      const [bookmarks] = await mySQL.query(bookmarkGetByIdsQuery, [sessionId, JSON.stringify(ids)]);

      return bookmarks;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async bookmarkListGetAll({ bookmarkId }) {
    const mySQL = new MySQL();

    try {
      const bookmarkListGetAllQuery = 'CALL bookmark_list_get_all(?)';

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
      const bookmarkGetAllByLinkIdQuery = 'CALL bookmark_get_all_by_link_id(?, ?)';

      const [response] = await mySQL.query(bookmarkGetAllByLinkIdQuery, [linkId, userId]);

      return response;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }
}
