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

    const list = await this.listRepo.listGetOneById({ listId, userId: session?.id });
    if (!list) throw new RequestError('List not found', 404, { message: '404 Not Found' });

    const listUser = await this.listRepo.listUserAdminGet(listUserGetOneRequest);
    if (!listUser) throw new RequestError('User not found', 404, { message: '404 Not Found' });

    return listUser;
  }
}
