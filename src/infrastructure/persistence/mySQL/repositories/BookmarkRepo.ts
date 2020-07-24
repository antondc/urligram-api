import { IBookmarkRepo } from '@domain/bookmark/repositories/IBookmarkRepo';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { BaseError } from '@shared/errors/BaseError';

export class BookmarkRepo implements IBookmarkRepo {
  public async bookmarkGetOne(bookmarkGetoneRequest) {
    const mySQL = new MySQL();

    try {
      const bookmarkGetOneQuery = `CALL bookmark_get_one('${JSON.stringify(bookmarkGetoneRequest)}')`;

      const [[bookmark]] = await mySQL.query(bookmarkGetOneQuery);

      return bookmark;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }
}
