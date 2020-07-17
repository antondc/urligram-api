import { IListRepo } from '@domain/list/repositories/IListRepo';
import { RequestError } from '@shared/errors/RequestError';
import { IListUserGetOneRequest } from './interfaces/IListUserGetOneRequest';
import { IListUserGetOneResponse } from './interfaces/IListUserGetOneResponse';

export interface IListUserGetOneUseCase {
  execute: (listUserGetOneRequest: IListUserGetOneRequest) => Promise<IListUserGetOneResponse>;
}

export class ListUserGetOneUseCase implements IListUserGetOneUseCase {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  public async execute(listUserGetOneRequest: IListUserGetOneRequest): Promise<IListUserGetOneResponse> {
    const { listId, session } = listUserGetOneRequest;

    const list = await this.listRepo.listGetOne({ listId, userId: session?.id });
    if (!list) throw new RequestError('List not found', 404, { message: '404 Not Found' });

    const listUser = await this.listRepo.listUserGetOne(listUserGetOneRequest);
    if (!listUser) throw new RequestError('User not found', 404, { message: '404 Not Found' });

    const isUserInList = list.users.filter((user) => user?.id === session?.id).length > 0; // (1)
    if (!isUserInList && !!list.isPrivate) throw new RequestError('This list is private', 403, { message: '403 Forbidden' });

    return listUser;
  }
}
