import { ITagRepo } from '@domain/tag/repositories/ITagRepo';
import { ITagListGetAllPublicRequest } from './interfaces/ITagListGetAllPublicRequest';
import { ITagListGetAllPublicResponse } from './interfaces/ITagListGetAllPublicResponse';

export interface ITagListGetAllPublicUseCase {
  execute: (tagListGetAllPublic: ITagListGetAllPublicRequest) => Promise<ITagListGetAllPublicResponse>;
}

export class TagListGetAllPublicUseCase implements ITagListGetAllPublicUseCase {
  private tagRepo: ITagRepo;

  constructor(tagRepo: ITagRepo) {
    this.tagRepo = tagRepo;
  }

  public async execute(tagListGetAllPublic: ITagListGetAllPublicRequest): Promise<ITagListGetAllPublicResponse> {
    const { tagId } = tagListGetAllPublic;
    const response = await this.tagRepo.tagListGetAllPublic({ tagId });

    return response;
  }
}
