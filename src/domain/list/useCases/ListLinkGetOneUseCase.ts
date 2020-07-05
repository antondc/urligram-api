import { IListLinkGetOneRequestDTO } from '@domain/list/dto/IListLinkGetOneRequestDTO';
import { IListLinkGetOneResponseDTO } from '@domain/list/dto/IListLinkGetOneResponseDTO';
import { IListRepo } from '@domain/list/repositories/IListRepo';
import { RequestError } from '@shared/errors/RequestError';

export interface IListLinkGetOneUseCase {
  execute: (listLinkGetOneRequestDTO: IListLinkGetOneRequestDTO) => Promise<IListLinkGetOneResponseDTO>;
}

export class ListLinkGetOneUseCase implements IListLinkGetOneUseCase {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  public async execute(listLinkGetOneRequestDTO: IListLinkGetOneRequestDTO): Promise<IListLinkGetOneResponseDTO> {
    const result = await this.listRepo.listLinkGetOne(listLinkGetOneRequestDTO);

    if (!result) throw new RequestError('List link does not exist', 404, { message: '404 Not Found' });

    return result;
  }
}
