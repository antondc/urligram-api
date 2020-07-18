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

    const list = await this.listRepo.listGetOne({ listId, userId: session?.id });
    if (!list) throw new RequestError('List not found', 404, { message: '404 Not found' });

    const isUserInList = list.users.filter((user) => user?.id === session?.id).length > 0; // (1)
    if (!isUserInList && !!list.isPrivate) throw new RequestError('This list is private', 403, { message: '403 Forbidden' });

    return list;
  }
}
