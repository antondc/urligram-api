import { IListRepo } from '@domain/list/repositories/IListRepo';
import { RequestError } from '@shared/errors/RequestError';
import { IListGetOneRequest } from './interfaces/IListGetOneRequest.ts';
import { IListGetOneResponse } from './interfaces/IListGetOneResponse';

export interface IListGetOneUseCase {
  execute: (listGetOneRequest: IListGetOneRequest) => Promise<IListGetOneResponse>;
}

export class ListGetOneUseCase implements IListGetOneUseCase {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  public async execute(listGetOneRequest: IListGetOneRequest): Promise<IListGetOneResponse> {
    // Returns only if list is public, or if user is in list (1)
    const { session, listId } = listGetOneRequest;

    const list = await this.listRepo.listGetOneById({ listId, userId: session?.id });
    if (!list) throw new RequestError('List not found', 404, { message: '404 Not found' });

    return list;
  }
}
