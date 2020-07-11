import { IListUserUpdateRequestDTO } from '@domain/list/dto/IListUserUpdateRequestDTO';
import { IListUserUpdateResponseDTO } from '@domain/list/dto/IListUserUpdateResponseDTO';
import { IListRepo } from '@domain/list/repositories/IListRepo';
import { RequestError } from '@shared/errors/RequestError';

export interface IListUserUpdateUseCase {
  execute: (listUserUpdateRequestDTO: IListUserUpdateRequestDTO) => Promise<IListUserUpdateResponseDTO>;
}

export class ListUserUpdateUseCase implements IListUserUpdateUseCase {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  public async execute(listUserUpdateRequestDTO: IListUserUpdateRequestDTO): Promise<IListUserUpdateResponseDTO> {
    const { listId, userId, sessionId, newRole } = listUserUpdateRequestDTO;

    const sessionUserList = await this.listRepo.listUserGetOne({ listId, userId: sessionId, sessionId });

    if (!sessionUserList) throw new RequestError('You are not in that list', 404, { message: '404 not found' });
    if (sessionUserList.userListRole !== 'admin') throw new RequestError('You are not the admin of that list', 409, { message: '409' });

    if (userId == sessionId && newRole !== 'admin')
      throw new RequestError('You can not stop being an admin of a list you created', 409, { message: '409 Conflict' });

    const targetUser = await this.listRepo.listUserGetOne({ listId, userId, sessionId });
    if (!targetUser) throw new RequestError('This user is not in that list', 404, { message: '404 not found' });

    await this.listRepo.listUserUpdate(listUserUpdateRequestDTO);

    const result = await this.listRepo.listUserGetOne({ listId, userId, sessionId });

    return result;
  }
}
