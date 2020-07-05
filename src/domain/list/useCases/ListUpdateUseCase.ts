import { IListUpdateRequestDTO } from '@domain/list/dto/IListUpdateRequestDTO';
import { IListUpdateResponseDTO } from '@domain/list/dto/IListUpdateResponseDTO';
import { IListRepo } from '@domain/list/repositories/IListRepo';
import { RequestError } from '@shared/errors/RequestError';

export interface IListUpdateUseCase {
  execute: (listUpdateRequestDTO: IListUpdateRequestDTO) => Promise<IListUpdateResponseDTO>;
}

export class ListUpdateUseCase implements IListUpdateUseCase {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  public async execute(listUpdateRequestDTO: IListUpdateRequestDTO): Promise<IListUpdateResponseDTO> {
    const listExists = await this.listRepo.listGetOne(listUpdateRequestDTO);

    if (!listExists.id) throw new RequestError('List already exists', 409, { message: '409 Conflict' });

    const result = await this.listRepo.listUpdate(listUpdateRequestDTO);

    return result;
  }
}
