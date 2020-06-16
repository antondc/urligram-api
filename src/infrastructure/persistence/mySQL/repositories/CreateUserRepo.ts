import { ICreateUserRepo } from '@domain/user/repositories/ICreateUserRepo';
import { ICreateUserRequestDTO } from '@domain/user/dto/ICreateUserRequestDTO';
import { ICreateUserResponseDTO } from '@domain/user/dto/ICreateUserResponseDTO';
import { MySQL } from '@infrastructure/persistence/mySQL/services/MySQL';
import { RequestError } from '@shared/errors/RequestError';

export class CreateUserRepo implements ICreateUserRepo {
  private mySQL: MySQL;

  constructor() {
    this.mySQL = new MySQL();
  }

  public async create(createUserDTO: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO> {
    try {
      const createPostQuery = `CALL create_user('${JSON.stringify(createUserDTO)}')`;
      const [[results]] = await this.mySQL.query(createPostQuery);
      await this.mySQL.close();

      return results;
    } catch (err) {
      throw new RequestError('User creation failed', 500, err);
    }
  }
}
