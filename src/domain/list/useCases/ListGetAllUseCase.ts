import { IListRepo } from '@domain/list/repositories/IListRepo';
import { IListGetAllRequest } from './interfaces/IListGetAllRequest';
import { IListGetAllResponse } from './interfaces/IListGetAllResponse';

export interface IListGetAllUseCase {
  execute: (listGetAllRequest: IListGetAllRequest) => Promise<IListGetAllResponse>;
}

export class ListGetAllUseCase implements IListGetAllUseCase {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  public async execute(listGetAllRequest: IListGetAllRequest): Promise<IListGetAllResponse> {
    const { session, sort, size } = listGetAllRequest;

    const lists = await this.listRepo.listGetAll({ userId: session?.id, size, sort });

    const listsWithTagsPromises = lists.map(async (item) => {
      const tags = await this.listRepo.listTagsGetAll({ listId: item.id, sessionId: session?.id });

      return {
        ...item,
        tags,
      };
    });

    const listsWithTags = await Promise.all(listsWithTagsPromises);

    return listsWithTags;
  }
}
