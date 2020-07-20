import { ITagRepo } from '@domain/tag/repositories/ITagRepo';
import { ITagGetAllResponse } from './interfaces/TagGetAllResponse';

export interface ITagGetAllUseCase {
  execute: () => Promise<ITagGetAllResponse>;
}

export class TagGetAllUseCase implements ITagGetAllUseCase {
  private tagRepo: ITagRepo;

  constructor(tagRepo: ITagRepo) {
    this.tagRepo = tagRepo;
  }

  public async execute(): Promise<ITagGetAllResponse> {
    const response = await this.tagRepo.tagGetAll();

    return response;
  }
}
