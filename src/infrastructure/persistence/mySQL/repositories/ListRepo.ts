import { IListRepo } from '@domain/list/repositories/IListRepo';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { BaseError } from '@shared/errors/BaseError';

export class ListRepo implements IListRepo {
  public async listGetOne(listGetOneRequestDTO) {
    const mySQL = new MySQL();

    try {
      const listGetOneQuery = `CALL list_get_one('${JSON.stringify(listGetOneRequestDTO)}')`;

      const [[list]] = await mySQL.query(listGetOneQuery);

      return list;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listGetAll() {
    const mySQL = new MySQL();

    try {
      const listGetAllQuery = `CALL list_get_all()`;

      const [list] = await mySQL.query(listGetAllQuery);

      return list;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listCreate(listCreateRequestDTO) {
    const mySQL = new MySQL();

    try {
      const listCreateQuery = `CALL list_create('${JSON.stringify(listCreateRequestDTO)}')`;

      const [[results]] = await mySQL.query(listCreateQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listUpdate(listUpdateRequestDTO) {
    const mySQL = new MySQL();

    try {
      const listUpdateQuery = `CALL list_update('${JSON.stringify(listUpdateRequestDTO)}')`;

      const [[results]] = await mySQL.query(listUpdateQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listDelete(listDeleteRequestDTO) {
    const mySQL = new MySQL();

    try {
      const listDeleteQuery = `CALL list_delete('${JSON.stringify(listDeleteRequestDTO)}')`;

      const [[results]] = await mySQL.query(listDeleteQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listLinkGetAll(listLinkGetAllRequestDTO) {
    const mySQL = new MySQL();

    try {
      const listLinkGetAllQuery = `CALL list_link_get_all('${JSON.stringify(listLinkGetAllRequestDTO)}')`;

      const [results] = await mySQL.query(listLinkGetAllQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listLinkGetOne(listLinkGetOneRequestDTO) {
    const mySQL = new MySQL();

    try {
      const listLinkGetOneQuery = `CALL list_link_get_one('${JSON.stringify(listLinkGetOneRequestDTO)}')`;

      const [[results]] = await mySQL.query(listLinkGetOneQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listUserUpdate(listUserUpdateRequestDTO) {
    const mySQL = new MySQL();

    try {
      const listUserUpdateQuery = `CALL list_user_update('${JSON.stringify(listUserUpdateRequestDTO)}')`;

      const [[results]] = await mySQL.query(listUserUpdateQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listUserGetOne(listUserGetOneRequestDTO) {
    const mySQL = new MySQL();

    try {
      const listUserGetOneQuery = `CALL list_user_get_one('${JSON.stringify(listUserGetOneRequestDTO)}')`;

      const [[results]] = await mySQL.query(listUserGetOneQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listUserGetAll(listUserGetAllRequestDTO) {
    const mySQL = new MySQL();

    try {
      const listUserGetAllQuery = `CALL list_user_get_all('${JSON.stringify(listUserGetAllRequestDTO)}')`;

      const [results] = await mySQL.query(listUserGetAllQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listUserDelete(listUserDeleteRequestDTO) {
    const mySQL = new MySQL();

    try {
      const listUserDeleteQuery = `CALL list_user_delete('${JSON.stringify(listUserDeleteRequestDTO)}')`;

      const [[results]] = await mySQL.query(listUserDeleteQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listTagGetAll(listTagGetAllRequestDTO) {
    const mySQL = new MySQL();

    try {
      const listTagGetAllQuery = `CALL list_tag_get_all('${JSON.stringify(listTagGetAllRequestDTO)}')`;

      const [results] = await mySQL.query(listTagGetAllQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listLinkCreate(listLinkCreateRequestDTO) {
    const mySQL = new MySQL();

    try {
      const listLinkCreateQuery = `CALL list_link_create('${JSON.stringify(listLinkCreateRequestDTO)}')`;

      const [[results]] = await mySQL.query(listLinkCreateQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }

  public async listLinkDelete(listLinkDeleteRequestDTO) {
    const mySQL = new MySQL();

    try {
      const listLinkDeleteQuery = `CALL list_link_delete('${JSON.stringify(listLinkDeleteRequestDTO)}')`;

      const [[results]] = await mySQL.query(listLinkDeleteQuery);

      return results;
    } catch (err) {
      throw new BaseError('Something went wrong', 500, err);
    } finally {
      await mySQL.close();
    }
  }
}
