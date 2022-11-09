import { IListRepo } from '@domain/list/repositories/IListRepo';
import { RequestError } from '@shared/errors/RequestError';
import { IListCreateOneRequest } from './interfaces/IListCreateOneRequest';
import { IListCreateOneResponse } from './interfaces/IListCreateOneResponse';

export interface IListCreateOneUseCase {
  execute: (listCreateOneRequest: IListCreateOneRequest) => Promise<IListCreateOneResponse>;
}

export class ListCreateOneUseCase implements IListCreateOneUseCase {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  public async execute(listCreateOneRequest: IListCreateOneRequest): Promise<IListCreateOneResponse> {
    const { session, listName, listDescription, listIsPublic } = listCreateOneRequest;

    const userInList = await this.listRepo.listUserGetOneByListName({ listName, userId: session?.id });
    if (!!userInList && userInList?.userRole === 'admin') throw new RequestError('List already exists', 409, { message: '409 Conflict' });

    const createList = await this.listRepo.listCreateOne({
      listName,
      listDescription,
      listIsPublic,
      userId: session?.id,
    });

    const createdList = await this.listRepo.listGetOneById({
      listId: createList?.listId,
      sessionId: session?.id,
    });
    if (!createdList) throw new RequestError('List creation failed', 500, { message: '500 Server error' });

    return createdList;
  }
}
