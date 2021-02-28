import { ITagRepo } from '@domain/tag/repositories/ITagRepo';
import { ITagGetAllRequest } from './interfaces/ITagGetAllRequest';
import { ITagGetAllResponse } from './interfaces/ITagGetAllResponse';

export interface ITagGetAllUseCase {
  execute: (tagGetAllRequest: ITagGetAllRequest) => Promise<ITagGetAllResponse>;
}

export class TagGetAllUseCase implements ITagGetAllUseCase {
  private tagRepo: ITagRepo;

  constructor(tagRepo: ITagRepo) {
    this.tagRepo = tagRepo;
  }

  public async execute(tagGetAllRequest: ITagGetAllRequest): Promise<ITagGetAllResponse> {
    const { session, sort, size, offset, filter } = tagGetAllRequest;

    const response = await this.tagRepo.tagGetAll({
      sessionId: session?.id,
      sort,
      size,
      offset,
      filter,
    });

    return response;
  }
}
