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
    const { listId, userId, currentUserId } = listUserDeleteRequestDTO;

    const currentUser = await this.listRepo.listUserGetOne({ listId, userId: currentUserId });

    if (userId == currentUserId && currentUser.level === 1)
      throw new RequestError('You can not remove yourself from a list you admin', 409, { message: '409 Conflict' });
    if (!currentUser) throw new RequestError('You are not in that list', 404, { message: '404 Conflict' });
    if (currentUser.level !== 1) throw new RequestError('You are not the admin of that list', 404, { message: '404 Conflict' });

    const targetUser = await this.listRepo.listUserGetOne({ listId, userId });
    if (!targetUser) throw new RequestError('This user is not in that list', 404, { message: '404 Conflict' });

    const result = await this.listRepo.listUserDelete(listUserDeleteRequestDTO);

    return result;
  }
}
