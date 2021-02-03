import { IListRepo } from '@domain/list/repositories/IListRepo';
import { RequestError } from '@shared/errors/RequestError';
import { IListSimilarGetAllRequest } from './interfaces/IListSimilarGetAllRequest';
import { IListSimilarGetAllResponse } from './interfaces/IListSimilarGetAllResponse';

export interface IListSimilarGetAllUseCase {
  execute: (listGetAllRequest: IListSimilarGetAllRequest) => Promise<IListSimilarGetAllResponse>;
}

export class ListSimilarGetAllUseCase implements IListSimilarGetAllUseCase {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  public async execute(listGetAllRequest: IListSimilarGetAllRequest): Promise<IListSimilarGetAllResponse> {
    const { session, listId, sort, size, offset } = listGetAllRequest;

    const list = await this.listRepo.listGetOneById({ listId, sessionId: session?.id });
    if (!list) throw new RequestError('List not found', 404, { message: '404 Not found' });
    const bookmarksIds = list?.bookmarksIds;
    const tagsIds = list?.tags.map((item) => item.id);
    const lists = await this.listRepo.listSimilarGetAll({ sessionId: session?.id, listId, bookmarksIds, tagsIds, sort, size, offset });

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
