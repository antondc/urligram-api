import { IListUserCreateRequestDTO } from '@domain/list/dto/IListUserCreateRequestDTO';
import { IListUserCreateResponseDTO } from '@domain/list/dto/IListUserCreateResponseDTO';
import { IListRepo } from '@domain/list/repositories/IListRepo';
import { RequestError } from '@shared/errors/RequestError';

export interface IListUserCreateUseCase {
  execute: (listUserCreateRequestDTO: IListUserCreateRequestDTO) => Promise<IListUserCreateResponseDTO>;
}

export class ListUserCreateUseCase implements IListUserCreateUseCase {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  public async execute(listUserCreateRequestDTO: IListUserCreateRequestDTO): Promise<IListUserCreateResponseDTO> {
    const { listId, session } = listUserCreateRequestDTO;

    const list = await this.listRepo.listGetOne({ id: listId });
    if (!list.id || !!list.isPrivate) throw new RequestError('There is not public list with this id', 404, { message: '404 Not found' });

    const listSession = await this.listRepo.listUserGetOne({ listId, userId: session?.id });
    if (!!listSession) throw new RequestError('You are already in that list', 409, { message: '409 Conflict' });

    const result = await this.listRepo.listUserCreate({ listId, userId: session?.id });

    return result;
  }
}
