import { IListUserGetOneRequestDTO } from '@domain/list/dto/IListUserGetOneRequestDTO';
import { IListUserGetOneResponseDTO } from '@domain/list/dto/IListUserGetOneResponseDTO';
import { IListRepo } from '@domain/list/repositories/IListRepo';
import { RequestError } from '@shared/errors/RequestError';

export interface IListUserGetOneUseCase {
  execute: (listUserGetOneRequestDTO: IListUserGetOneRequestDTO) => Promise<IListUserGetOneResponseDTO>;
}

export class ListUserGetOneUseCase implements IListUserGetOneUseCase {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  public async execute(listUserGetOneRequestDTO: IListUserGetOneRequestDTO): Promise<IListUserGetOneResponseDTO> {
    const { listId, sessionId } = listUserGetOneRequestDTO;

    const sessionUserList = await this.listRepo.listUserGetOne({ listId, userId: sessionId, sessionId });
    const list = await this.listRepo.listGetOne({ id: listId });

    if (list.listType === 'private' && !sessionUserList) throw new RequestError('There is not public list with this id', 404, { message: '404 Not found' });

    const result = await this.listRepo.listUserGetOne(listUserGetOneRequestDTO);

    if (!result) throw new RequestError('There is no user in a public list with this id', 404, { message: '404 Not Found' });

    return result;
  }
}
