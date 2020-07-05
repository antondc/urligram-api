import { IListLinkGetAllRequestDTO } from '@domain/list/dto/IListLinkGetAllRequestDTO';
import { IListLinkGetAllResponseDTO } from '@domain/list/dto/IListLinkGetAllResponseDTO';
import { IListRepo } from '@domain/list/repositories/IListRepo';
import { RequestError } from '@shared/errors/RequestError';

export interface IListLinkGetAllUseCase {
  execute: (listLinkGetAllRequestDTO: IListLinkGetAllRequestDTO) => Promise<IListLinkGetAllResponseDTO>;
}

export class ListLinkGetAllUseCase implements IListLinkGetAllUseCase {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  public async execute(listLinkGetAllRequestDTO: IListLinkGetAllRequestDTO): Promise<IListLinkGetAllResponseDTO> {
    const result = await this.listRepo.listLinkGetAll(listLinkGetAllRequestDTO);

    if (!result) throw new RequestError('List link does not exist', 404, { message: '404 Not Found' });

    return result;
  }
}
