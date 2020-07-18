import { IListRepo } from '@domain/list/repositories/IListRepo';
import { RequestError } from '@shared/errors/RequestError';
import { IListCreateOneRequest } from './interfaces/IListCreateOneRequest';
import { IListCreateOneResponse } from './interfaces/IListCreateOneResponse';

export interface IListCreateOneUseCase {
  execute: (listCreateOneRequestDTO: IListCreateOneRequest) => Promise<IListCreateOneResponse>;
}

export class ListCreateOneUseCase implements IListCreateOneUseCase {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  public async execute(listCreateOneRequestDTO: IListCreateOneRequest): Promise<IListCreateOneResponse> {
    const { session, listName } = listCreateOneRequestDTO;

    const listExists = await this.listRepo.listUserAdminGet({ listName, userId: session?.id });
    if (!!listExists) throw new RequestError('List already exists', 409, { message: '409 Conflict' });

    const response = await this.listRepo.listCreateOne({ ...listCreateOneRequestDTO, userId: session?.id });

    const createdList = await this.listRepo.listGetOneById({
      listId: Number(response?.listId),
      userId: session?.id,
    });
    if (!createdList) throw new RequestError('List creation failed', 500, { message: '500 Server error' });

    return createdList;
  }
}
