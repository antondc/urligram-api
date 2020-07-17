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
    const { session, ...listGetOneRequestWithoutSession } = listGetOneRequest;

    const response = await this.listRepo.listGetOne({ ...listGetOneRequestWithoutSession, userId: session?.id });
    const isUserInList = response.users.filter((user) => user?.id === session?.id).length > 0; // (1)

    if (!isUserInList && !!response.isPrivate) throw new RequestError('List not found', 404, { message: '404 Not found' });

    return response;
  }
}
