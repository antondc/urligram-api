import { Session } from 'inspector';

import { IListRepo } from '@domain/list/repositories/IListRepo';
import { RequestError } from '@shared/errors/RequestError';
import { IListUserGetAllRequest } from './interfaces/IListUserGetAllRequest';
import { IListUserGetAllResponse } from './interfaces/IListUserGetAllResponse';

export interface IListUserGetAllUseCase {
  execute: (listUserGetAllRequest: IListUserGetAllRequest) => Promise<IListUserGetAllResponse>;
}

export class ListUserGetAllUseCase implements IListUserGetAllUseCase {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  public async execute(listUserGetAllRequest: IListUserGetAllRequest): Promise<IListUserGetAllResponse> {
    const { listId, session } = listUserGetAllRequest;

    const list = await this.listRepo.listGetOneById({ listId });
    if (!list) throw new RequestError('List not found', 404, { message: '404 Not Found' });

    const listUser = await this.listRepo.listUserGetOneByListId({ listId, userId: session?.id });
    if (!!list.isPrivate && !listUser) throw new RequestError('This list is private', 403, { message: '403 Forbidden' });

    const listUsers = await this.listRepo.listUserGetAll({ listId });

    return listUsers;
  }
}
