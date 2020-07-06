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

  public async tagGetOne(tagGetOneRequestDTO) {
    const mySQL = new MySQL();

    try {
      const tagGetOneQuery = `CALL tag_get_one('${JSON.stringify(tagGetOneRequestDTO)}')`;

      const [[tags]] = await mySQL.query(tagGetOneQuery);

      return tags;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async tagLinkGetAll(tagLinkGetAllRequestDTO) {
    const mySQL = new MySQL();

    try {
      const tagLinkGetAllQuery = `CALL tag_link_get_all('${JSON.stringify(tagLinkGetAllRequestDTO)}')`;

      const [tags] = await mySQL.query(tagLinkGetAllQuery);

      return tags;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async tagListGetAll(tagListGetAllRequestDTO) {
    const mySQL = new MySQL();

    try {
      const tagListGetAllQuery = `CALL tag_list_get_all('${JSON.stringify(tagListGetAllRequestDTO)}')`;

      const [tags] = await mySQL.query(tagListGetAllQuery);

      return tags;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }
}
