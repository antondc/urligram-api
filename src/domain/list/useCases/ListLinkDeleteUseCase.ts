import { IListLinkDeleteRequestDTO } from '@domain/list/dto/IListLinkDeleteRequestDTO';
import { IListLinkDeleteResponseDTO } from '@domain/list/dto/IListLinkDeleteResponseDTO';
import { IListRepo } from '@domain/list/repositories/IListRepo';
import { RequestError } from '@shared/errors/RequestError';

export interface IListLinkDeleteUseCase {
  execute: (listLinkDeleteRequestDTO: IListLinkDeleteRequestDTO) => Promise<IListLinkDeleteResponseDTO>;
}

export class ListLinkDeleteUseCase implements IListLinkDeleteUseCase {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  public async execute(listLinkDeleteRequestDTO: IListLinkDeleteRequestDTO): Promise<IListLinkDeleteResponseDTO> {
    const listLinkExist = await this.listRepo.listLinkGetOne(listLinkDeleteRequestDTO);
    if (!listLinkExist) throw new RequestError('List link does not exist', 404, { message: '404 Not Found' });

    const result = await this.listRepo.listLinkDelete(listLinkDeleteRequestDTO);

    return result;
  }
}
