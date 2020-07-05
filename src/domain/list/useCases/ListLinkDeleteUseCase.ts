import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { IListLinkDeleteRequestDTO } from '@domain/list/dto/IListLinkDeleteRequestDTO';
import { IListLinkDeleteResponseDTO } from '@domain/list/dto/IListLinkDeleteResponseDTO';
import { IListRepo } from '@domain/list/repositories/IListRepo';
import { RequestError } from '@shared/errors/RequestError';

export interface IListLinkDeleteUseCase {
  execute: (listLinkDeleteRequestDTO: IListLinkDeleteRequestDTO) => Promise<IListLinkDeleteResponseDTO>;
}

export class ListLinkDeleteUseCase implements IListLinkDeleteUseCase {
  private listRepo: IListRepo;
  private linkRepo: ILinkRepo;

  constructor(listRepo: IListRepo, linkRepo: ILinkRepo) {
    this.listRepo = listRepo;
    this.linkRepo = linkRepo;
  }

  public async execute(listLinkDeleteRequestDTO: IListLinkDeleteRequestDTO): Promise<IListLinkDeleteResponseDTO> {
    const searchListData = {
      id: listLinkDeleteRequestDTO.listId,
    };
    const listExists = await this.listRepo.listGetOne(searchListData);
    if (!listExists.id) throw new RequestError('List does not exist', 404, { message: '404 Not Found' });

    const searchLinkData = {
      id: listLinkDeleteRequestDTO.linkId,
    };
    const linkExist = await this.linkRepo.linkGetOne(searchLinkData);
    if (!linkExist) throw new RequestError('Link does not exist', 404, { message: '404 Not Found' });

    const result = await this.listRepo.listLinkDelete(listLinkDeleteRequestDTO);

    return result;
  }
}
