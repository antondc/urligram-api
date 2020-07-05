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
    const result = await this.listRepo.listUserGetAll(listUserGetAllRequestDTO);

    if (!result) throw new RequestError('List link does not exist', 404, { message: '404 Not Found' });

    return result;
  }
}
