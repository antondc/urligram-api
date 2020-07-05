import { IListDeleteRequestDTO } from '@domain/list/dto/IListDeleteRequestDTO';
import { IListDeleteResponseDTO } from '@domain/list/dto/IListDeleteResponseDTO';
import { IListRepo } from '@domain/list/repositories/IListRepo';
import { RequestError } from '@shared/errors/RequestError';

export interface IListDeleteUseCase {
  execute: (listDeleteRequestDTO: IListDeleteRequestDTO) => Promise<IListDeleteResponseDTO>;
}

export class ListDeleteUseCase implements IListDeleteUseCase {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  public async execute(listDeleteRequestDTO: IListDeleteRequestDTO): Promise<IListDeleteResponseDTO> {
    const result = await this.listRepo.listGetOne(listDeleteRequestDTO);
    if (!result.id) throw new RequestError('Not found', 404);

    const response = await this.listRepo.listDelete(listDeleteRequestDTO);

    return response;
  }
}
