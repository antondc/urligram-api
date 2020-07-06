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
    const result = await this.listRepo.listTagGetAll(listTagGetAllRequestDTO);

    if (!result) throw new RequestError('List link does not exist', 404, { message: '404 Not Found' });

    return result;
  }
}
