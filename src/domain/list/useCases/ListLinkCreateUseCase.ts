import { IListLinkCreateRequestDTO } from '@domain/list/dto/IListLinkCreateRequestDTO';
import { IListLinkCreateResponseDTO } from '@domain/list/dto/IListLinkCreateResponseDTO';
import { IListRepo } from '@domain/list/repositories/IListRepo';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { RequestError } from '@shared/errors/RequestError';

export interface IListLinkCreateUseCase {
  execute: (listLinkCreateRequestDTO: IListLinkCreateRequestDTO) => Promise<IListLinkCreateResponseDTO>;
}

export class ListLinkCreateUseCase implements IListLinkCreateUseCase {
  private listRepo: IListRepo;
  private userRepo: IUserRepo;

  constructor(listRepo: IListRepo, userRepo: IUserRepo) {
    this.listRepo = listRepo;
    this.userRepo = userRepo;
  }

  public async execute(listLinkCreateRequestDTO: IListLinkCreateRequestDTO): Promise<IListLinkCreateResponseDTO> {
    const { session } = listLinkCreateRequestDTO;
    const searchListData = {
      id: listLinkCreateRequestDTO.listId,
    };
    const listExists = await this.listRepo.listGetOne(searchListData);
    if (!listExists.id) throw new RequestError('List does not exist', 404, { message: '404 Not Found' });

    const listLinkSearchData = {
      listId: listLinkCreateRequestDTO.listId,
      linkId: listLinkCreateRequestDTO.linkId,
      userId: session?.id,
    };
    const listLink = await this.listRepo.listLinkGetOne(listLinkSearchData);
    if (!!listLink) throw new RequestError('List link already exists', 409, { message: '409 Conflict' });

    const searchLinkData = {
      linkId: listLinkCreateRequestDTO.linkId,
      userId: session?.id,
    };
    const linkExist = await this.userRepo.userLinkGetOne(searchLinkData);
    if (!linkExist) throw new RequestError('Link does not exist', 404, { message: '404 Not Found' });

    const createdLinkInList = await this.listRepo.listLinkCreate({ ...listLinkCreateRequestDTO, userId: session?.id });

    const result = await this.listRepo.listLinkGetOne({ listId: createdLinkInList.listId, linkId: createdLinkInList.linkId, userId: session?.id });

    return result;
  }
}
