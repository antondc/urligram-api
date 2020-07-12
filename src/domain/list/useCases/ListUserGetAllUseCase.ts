import { IListUserGetAllRequestDTO } from '@domain/list/dto/IListUserGetAllRequestDTO';
import { IListUserGetAllResponseDTO } from '@domain/list/dto/IListUserGetAllResponseDTO';
import { IListRepo } from '@domain/list/repositories/IListRepo';
import { RequestError } from '@shared/errors/RequestError';

export interface IListUserGetAllUseCase {
  execute: (listUserGetAllRequestDTO: IListUserGetAllRequestDTO) => Promise<IListUserGetAllResponseDTO>;
}

export class ListUserGetAllUseCase implements IListUserGetAllUseCase {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  public async execute(listUserGetAllRequestDTO: IListUserGetAllRequestDTO): Promise<IListUserGetAllResponseDTO> {
    const { listId, session } = listUserGetAllRequestDTO;

    const sessionUserList = await this.listRepo.listUserGetOne({ listId, userId: session?.id });
    const list = await this.listRepo.listGetOne({ id: listId });

    if (!list.id) throw new RequestError('There is not list with this id', 404, { message: '404 Not found' });
    if (!!list.isPrivate && !sessionUserList) throw new RequestError('There is not public list with this id', 404, { message: '404 Not found' });

    const result = await this.listRepo.listUserGetAll(listUserGetAllRequestDTO);

    if (!result) throw new RequestError('List link does not exist', 404, { message: '404 Not Found' });

    return result;
  }
}
