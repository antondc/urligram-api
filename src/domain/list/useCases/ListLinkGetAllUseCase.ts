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
    // (1) Should return data only if user is in list, or if list is not private
    // (2) If session user is not the admin of the list, filter out links where he is not the owner, or private links

    const { listId, session } = listLinkGetAllRequestDTO;

    const sessionUserList = await this.listRepo.listUserGetOne({
      listId,
      userId: session?.id,
      sessionId: session?.id,
    });

    const list = await this.listRepo.listGetOne({ id: listId });

    if (!list.id) throw new RequestError('There is not list with this id', 404, { message: '404 Not found' }); // (1)
    if (list.listType === 'private' && !sessionUserList) throw new RequestError('There is not public list with this id', 404, { message: '404 Not found' }); // (1)

    const result = await this.listRepo.listLinkGetAll(listLinkGetAllRequestDTO);
    // if (!result) throw new RequestError('List link does not exist', 404, { message: '404 Not Found' });

    if (sessionUserList?.userListRole !== 'admin') {
      const filteredData = result.filter((item) => session?.id === item.userId || !item.isPrivate); // (2)

      return {
        list,
        links: filteredData,
      };
    }

    if (sessionUserList?.userListRole !== 'admin') return { links: result.filter((item) => session?.id === item.userId || !!item.isPrivate), list }; // (2)

    return {
      list,
      links: result,
    };
  }
}
