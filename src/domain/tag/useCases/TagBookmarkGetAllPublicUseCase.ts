import { ITagRepo } from '@domain/tag/repositories/ITagRepo';
import { ITagBookmarkGetAllPublicRequest } from './interfaces/ITagBookmarkGetAllPublicRequest';
import { ITagBookmarkGetAllPublicResponse } from './interfaces/ITagBookmarkGetAllPublicResponse';

export interface ITagBookmarkGetAllPublicUseCase {
  execute: (tagBookmarkGetAllPublic: ITagBookmarkGetAllPublicRequest) => Promise<ITagBookmarkGetAllPublicResponse>;
}

export class TagBookmarkGetAllPublicUseCase implements ITagBookmarkGetAllPublicUseCase {
  private tagRepo: ITagRepo;

  constructor(tagRepo: ITagRepo) {
    this.tagRepo = tagRepo;
  }

  public async execute(tagBookmarkGetAllPublic: ITagBookmarkGetAllPublicRequest): Promise<ITagBookmarkGetAllPublicResponse> {
    const { tagId, session } = tagBookmarkGetAllPublic;
    const response = await this.tagRepo.tagBookmarkGetAllPublic({ sessionId: session?.id, tagId });

    return response;
  }
}
