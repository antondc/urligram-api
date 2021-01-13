import { IBookmarkRepo } from '@domain/bookmark/repositories/IBookmarkRepo';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { BaseError } from '@shared/errors/BaseError';

export class BookmarkRepo implements IBookmarkRepo {
  public async bookmarkGetOne(bookmarkGetOneRequest) {
    const mySQL = new MySQL();

    try {
      const bookmarkGetOneQuery = `CALL bookmark_get_one(?)`;

      const [[bookmark]] = await mySQL.query(bookmarkGetOneQuery, bookmarkGetOneRequest);

      return bookmark;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async bookmarkTagGetAll(bookmarkTagGetAllRequest) {
    const mySQL = new MySQL();

    try {
      const bookmarkTagGetAllQuery = `CALL bookmark_tag_get_all(?)`;

      const [response] = await mySQL.query(bookmarkTagGetAllQuery, bookmarkTagGetAllRequest);

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

  public async bookmarkListGetAll(bookmarkListGetAllRequest) {
    const mySQL = new MySQL();

    try {
      const bookmarkListGetAllQuery = `CALL bookmark_list_get_all(?)`;

      const [response] = await mySQL.query(bookmarkListGetAllQuery, bookmarkListGetAllRequest);

      return response;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async bookmarkGetAllByLinkId(bookmarkGetAllByLinkIdRequest) {
    const mySQL = new MySQL();

    try {
      const bookmarkGetAllByLinkIdQuery = `CALL bookmark_get_all_by_link_id(?, ?)`;

      const [response] = await mySQL.query(bookmarkGetAllByLinkIdQuery, bookmarkGetAllByLinkIdRequest);

      return response;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }
}
