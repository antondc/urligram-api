import { ITagRepo } from '@domain/tag/repositories/ITagRepo';
import { ITagGetAllByUserIdRequest } from './interfaces/ITagGetAllByUserIdRequest';
import { ITagGetAllByUserIdResponse } from './interfaces/ITagGetAllByUserIdResponse';
import { ITagGetAllResponse } from './interfaces/ITagGetAllResponse';

export interface ITagGetAllByUserIdUseCase {
  execute: (tagGetAllRequest: ITagGetAllByUserIdRequest) => Promise<ITagGetAllResponse>;
}

export class TagGetAllByUserIdUseCase implements ITagGetAllByUserIdUseCase {
  private tagRepo: ITagRepo;

  constructor(tagRepo: ITagRepo) {
    this.tagRepo = tagRepo;
  }

  public async execute(tagGetAllRequest: ITagGetAllByUserIdRequest): Promise<ITagGetAllByUserIdResponse> {
    const { userId, session } = tagGetAllRequest;

    const tags = await this.tagRepo.tagGetAllByUserId({ userId, sessionId: session?.id });
    const sortedTags = tags.sort((curr, next) => curr.id - next.id);

    return sortedTags;
  }
}
