import { ITagGetOneRequestDTO } from '@domain/tag/dto/ITagGetOneRequestDTO';
import { ITagGetOneResponseDTO } from '@domain/tag/dto/ITagGetOneResponseDTO';
import { ITagRepo } from '@domain/tag/repositories/ITagRepo';

export interface ITagGetOneUseCase {
  execute: (tagGetOneDTO: ITagGetOneRequestDTO) => Promise<ITagGetOneResponseDTO>;
}

export class TagGetOneUseCase implements ITagGetOneUseCase {
  private tagRepo: ITagRepo;

  constructor(tagRepo: ITagRepo) {
    this.tagRepo = tagRepo;
  }

  public async execute(tagGetOneDTO: ITagGetOneRequestDTO): Promise<ITagGetOneResponseDTO> {
    const response = await this.tagRepo.tagGetOne(tagGetOneDTO);

    return response;
  }
}
