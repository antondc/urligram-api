import { IListTagGetAllRequestDTO } from '@domain/list/dto/IListTagGetAllRequestDTO';
import { IListTagGetAllResponseDTO } from '@domain/list/dto/IListTagGetAllResponseDTO';
import { IListRepo } from '@domain/list/repositories/IListRepo';
import { RequestError } from '@shared/errors/RequestError';

export interface IListTagGetAllUseCase {
  execute: (listTagGetAllRequestDTO: IListTagGetAllRequestDTO) => Promise<IListTagGetAllResponseDTO>;
}

export class ListTagGetAllUseCase implements IListTagGetAllUseCase {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  public async execute(listTagGetAllRequestDTO: IListTagGetAllRequestDTO): Promise<IListTagGetAllResponseDTO> {
    // Should return tags only if user is in list, or if list is not private
    const { listId, session } = listTagGetAllRequestDTO;

    const sessionUserList = await this.listRepo.listUserGetOne({ listId, userId: session?.id });
    const list = await this.listRepo.listGetOne({ id: listId });

    if (!list.id) throw new RequestError('There is not list with this id', 404, { message: '404 Not found' });
    if (!!list.isPrivate && !sessionUserList) throw new RequestError('There is not public list with this id', 404, { message: '404 Not found' });

    const result = await this.listRepo.listTagGetAll(listTagGetAllRequestDTO);

    if (!result) throw new RequestError('List link does not exist', 404, { message: '404 Not Found' });

    return result;
  }
}
