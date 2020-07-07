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
    const { listId, userId, currentUserId, newRole } = listUserUpdateRequestDTO;

    const currentUser = await this.listRepo.listUserGetOne({ listId, userId: currentUserId });
    if (!currentUser) throw new RequestError('You are not in that list', 404, { message: '404 Conflict' });
    if (currentUser.level !== 1) throw new RequestError('You are not the admin of that list', 404, { message: '404 Conflict' });

    if (userId == currentUserId && newRole !== 1)
      throw new RequestError('You can not stop being an admin of a list you created', 409, { message: '409 Conflict' });

    const targetUser = await this.listRepo.listUserGetOne({ listId, userId });
    if (!targetUser) throw new RequestError('This user is not in that list', 404, { message: '404 Conflict' });

    const result = await this.listRepo.listUserUpdate(listUserUpdateRequestDTO);

    return result;
  }
}
