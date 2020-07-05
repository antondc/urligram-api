import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { IListLinkCreateRequestDTO } from '@domain/list/dto/IListLinkCreateRequestDTO';
import { IListLinkCreateResponseDTO } from '@domain/list/dto/IListLinkCreateResponseDTO';
import { IListRepo } from '@domain/list/repositories/IListRepo';
import { RequestError } from '@shared/errors/RequestError';

export interface IListLinkCreateUseCase {
  execute: (listLinkCreateRequestDTO: IListLinkCreateRequestDTO) => Promise<IListLinkCreateResponseDTO>;
}

export class ListLinkCreateUseCase implements IListLinkCreateUseCase {
  private listRepo: IListRepo;
  private linkRepo: ILinkRepo;

  constructor(listRepo: IListRepo, linkRepo: ILinkRepo) {
    this.listRepo = listRepo;
    this.linkRepo = linkRepo;
  }

  public async execute(listLinkCreateRequestDTO: IListLinkCreateRequestDTO): Promise<IListLinkCreateResponseDTO> {
    const searchListData = {
      id: listLinkCreateRequestDTO.listId,
    };
    const listExists = await this.listRepo.listGetOne(searchListData);
    if (!listExists.id) throw new RequestError('List does not exist', 404, { message: '404 Not Found' });

    const searchLinkData = {
      id: listLinkCreateRequestDTO.linkId,
    };
    const linkExist = await this.linkRepo.linkGetOne(searchLinkData);
    if (!linkExist) throw new RequestError('Link does not exist', 404, { message: '404 Not Found' });

    const result = await this.listRepo.listLinkCreate(listLinkCreateRequestDTO);

    return result;
  }
}
