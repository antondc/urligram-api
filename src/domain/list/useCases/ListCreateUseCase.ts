import { IListRepo } from '@domain/list/repositories/IListRepo';
import { RequestError } from '@shared/errors/RequestError';
import { IListCreateRequest } from './interfaces/IListCreateRequest';
import { IListCreateResponse } from './interfaces/IListCreateResponse';

export interface IListCreateUseCase {
  execute: (listCreateRequestDTO: IListCreateRequest) => Promise<IListCreateResponse>;
}

export class ListCreateUseCase implements IListCreateUseCase {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  public async execute(listCreateRequestDTO: IListCreateRequest): Promise<IListCreateResponse> {
    const { session, listName } = listCreateRequestDTO;

    const listExists = await this.listRepo.listUserAdminGet({ listName, userId: session?.id });
    if (!!listExists) throw new RequestError('List already exists', 409, { message: '409 Conflict' });

    const response = await this.listRepo.listCreate({ ...listCreateRequestDTO, userId: session?.id });

    const createdList = await this.listRepo.listGetOneById({
      listId: Number(response?.listId),
      userId: session?.id,
    });
    if (!createdList) throw new RequestError('List creation failed', 500, { message: '500 Server error' });

    return createdList;
  }
}
