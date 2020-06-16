import { IFindUserRepo } from '@domain/user/repositories/IFindUserRepo';
import { IFindUserRequestDTO } from '@domain/user/dto/IFindUserRequestDTO';
import { IFindUserResponseDTO } from '@domain/user/dto/IFindUserResponseDTO';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { RequestError } from '@shared/errors/RequestError';

export class FindUserRepo implements IFindUserRepo {
  private mySQL: MySQL;

  constructor() {
    this.mySQL = new MySQL();
  }

  public async find(findUserDTO: IFindUserRequestDTO): Promise<IFindUserResponseDTO> {
    try {
      const findUserQuery = `CALL find_user('${JSON.stringify(findUserDTO)}')`;
      const [[results]] = await this.mySQL.query(findUserQuery);

      await this.mySQL.close();

      return results;
    } catch (err) {
      throw new RequestError('Something failed', 500, err);
    }
  }
}
