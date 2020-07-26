import { IBookmarkRepo } from '@domain/bookmark/repositories/IBookmarkRepo';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { BaseError } from '@shared/errors/BaseError';

export class BookmarkRepo implements IBookmarkRepo {
  public async bookmarkGetOne(bookmarkGetOneRequest) {
    const mySQL = new MySQL();

    try {
      const bookmarkGetOneQuery = `CALL bookmark_get_one('${JSON.stringify(bookmarkGetOneRequest)}')`;

      const [[bookmark]] = await mySQL.query(bookmarkGetOneQuery);

      return bookmark;
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
}
