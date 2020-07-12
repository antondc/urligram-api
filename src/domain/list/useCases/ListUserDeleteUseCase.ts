import { IListUserDeleteRequestDTO } from '@domain/list/dto/IListUserDeleteRequestDTO';
import { IListUserDeleteResponseDTO } from '@domain/list/dto/IListUserDeleteResponseDTO';
import { IListRepo } from '@domain/list/repositories/IListRepo';
import { RequestError } from '@shared/errors/RequestError';

export interface IListUserDeleteUseCase {
  execute: (listUserDeleteRequestDTO: IListUserDeleteRequestDTO) => Promise<IListUserDeleteResponseDTO>;
}

export class ListUserDeleteUseCase implements IListUserDeleteUseCase {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  public async execute(listUserDeleteRequestDTO: IListUserDeleteRequestDTO): Promise<IListUserDeleteResponseDTO> {
    const { listId, userId, session } = listUserDeleteRequestDTO;

    const sessionUserList = await this.listRepo.listUserGetOne({ listId, userId: session?.id });

    if (userId == session?.id && sessionUserList?.userListRole === 'admin')
      throw new RequestError('You can not remove yourself from a list you admin', 409, { message: '409 Conflict' });

    if (!sessionUserList) throw new RequestError('You are not in that list', 404, { message: '404 not found' });
    if (sessionUserList?.userListRole !== 'admin' && userId !== session?.id)
      throw new RequestError('You are not the admin of that list', 409, { message: '409' });

    const targetUser = await this.listRepo.listUserGetOne({ listId, userId });
    if (!targetUser) throw new RequestError('This user is not in that list', 404, { message: '404 not found' });

    const result = await this.listRepo.listUserDelete(listUserDeleteRequestDTO);

    return result;
  }
}
