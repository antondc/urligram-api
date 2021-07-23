import { IListRepo } from '@domain/list/repositories/IListRepo';
import { IListBookmarkUserGetAllRequest } from './interfaces/IListBookmarkUserGetAllRequest';
import { IListBookmarkUserGetAllResponse } from './interfaces/IListBookmarkUserGetAllResponse';

export interface IListBookmarkUserGetAllUseCase {
  execute: (listBookmarkUserGetAllRequest: IListBookmarkUserGetAllRequest) => Promise<IListBookmarkUserGetAllResponse>;
}

export class ListBookmarkUserGetAllUseCase implements IListBookmarkUserGetAllUseCase {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  public async execute(listBookmarkUserGetAllRequest: IListBookmarkUserGetAllRequest): Promise<IListBookmarkUserGetAllResponse> {
    const { session } = listBookmarkUserGetAllRequest;

    const listBookmarkUserUpdated = await this.listRepo.listBookmarkUserGetAll({ userId: session?.id });

    return listBookmarkUserUpdated;
  }
}
