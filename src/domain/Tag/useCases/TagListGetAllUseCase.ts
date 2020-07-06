import { ITagListGetAllRequestDTO } from '@domain/tag/dto/ITagListGetAllRequestDTO';
import { ITagListGetAllResponseDTO } from '@domain/tag/dto/ITagListGetAllResponseDTO';
import { ITagRepo } from '@domain/tag/repositories/ITagRepo';
import { RequestError } from '@shared/errors/RequestError';

export interface ITagListGetAllUseCase {
  execute: (tagListGetAllRequestDTO: ITagListGetAllRequestDTO) => Promise<ITagListGetAllResponseDTO>;
}

export class TagListGetAllUseCase implements ITagListGetAllUseCase {
  private tagRepo: ITagRepo;

  constructor(tagRepo: ITagRepo) {
    this.tagRepo = tagRepo;
  }

  public async execute(tagListGetAllRequestDTO: ITagListGetAllRequestDTO): Promise<ITagListGetAllResponseDTO> {
    const result = await this.tagRepo.tagListGetAll(tagListGetAllRequestDTO);

    if (!result) throw new RequestError('Tag link does not exist', 404, { message: '404 Not Found' });

    return result;
  }
}
