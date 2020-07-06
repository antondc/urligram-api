import { ITagGetAllResponseDTO } from '@domain/tag/dto/ITagGetAllResponseDTO';
import { ITagRepo } from '@domain/tag/repositories/ITagRepo';

export interface ITagGetAllUseCase {
  execute: () => Promise<ITagGetAllResponseDTO>;
}

export class TagGetAllUseCase implements ITagGetAllUseCase {
  private tagRepo: ITagRepo;

  constructor(tagRepo: ITagRepo) {
    this.tagRepo = tagRepo;
  }

  public async execute(): Promise<ITagGetAllResponseDTO> {
    const response = await this.tagRepo.tagGetAll();

    return response;
  }
}
