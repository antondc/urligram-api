import { ITagRepo } from '@domain/tag/repositories/ITagRepo';
import { ITagUserGetAllPublicRequest } from './interfaces/ITagUserGetAllPublicRequest';
import { ITagUserGetAllPublicResponse } from './interfaces/ITagUserGetAllPublicResponse';

export interface ITagUserGetAllPublicUseCase {
  execute: (tagUserGetAllPublic: ITagUserGetAllPublicRequest) => Promise<ITagUserGetAllPublicResponse>;
}

export class TagUserGetAllPublicUseCase implements ITagUserGetAllPublicUseCase {
  private tagRepo: ITagRepo;

  constructor(tagRepo: ITagRepo) {
    this.tagRepo = tagRepo;
  }

  public async execute(tagUserGetAllPublic: ITagUserGetAllPublicRequest): Promise<ITagUserGetAllPublicResponse> {
    const { tagId } = tagUserGetAllPublic;
    const response = await this.tagRepo.tagUserGetAllPublic({ tagId });

    return response;
  }
}
