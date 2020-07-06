import { ITagUserGetAllRequestDTO } from '@domain/tag/dto/ITagUserGetAllRequestDTO';
import { ITagUserGetAllResponseDTO } from '@domain/tag/dto/ITagUserGetAllResponseDTO';
import { ITagRepo } from '@domain/tag/repositories/ITagRepo';
import { RequestError } from '@shared/errors/RequestError';

export interface ITagUserGetAllUseCase {
  execute: (tagUserGetAllRequestDTO: ITagUserGetAllRequestDTO) => Promise<ITagUserGetAllResponseDTO>;
}

export class TagUserGetAllUseCase implements ITagUserGetAllUseCase {
  private tagRepo: ITagRepo;

  constructor(tagRepo: ITagRepo) {
    this.tagRepo = tagRepo;
  }

  public async execute(tagUserGetAllRequestDTO: ITagUserGetAllRequestDTO): Promise<ITagUserGetAllResponseDTO> {
    const result = await this.tagRepo.tagUserGetAll(tagUserGetAllRequestDTO);

    if (!result) throw new RequestError('Tag link does not exist', 404, { message: '404 Not Found' });

    return result;
  }
}
