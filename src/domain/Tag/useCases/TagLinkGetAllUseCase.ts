import { ITagLinkGetAllRequestDTO } from '@domain/tag/dto/ITagLinkGetAllRequestDTO';
import { ITagLinkGetAllResponseDTO } from '@domain/tag/dto/ITagLinkGetAllResponseDTO';
import { ITagRepo } from '@domain/tag/repositories/ITagRepo';
import { RequestError } from '@shared/errors/RequestError';

export interface ITagLinkGetAllUseCase {
  execute: (tagLinkGetAllRequestDTO: ITagLinkGetAllRequestDTO) => Promise<ITagLinkGetAllResponseDTO>;
}

export class TagLinkGetAllUseCase implements ITagLinkGetAllUseCase {
  private tagRepo: ITagRepo;

  constructor(tagRepo: ITagRepo) {
    this.tagRepo = tagRepo;
  }

  public async execute(tagLinkGetAllRequestDTO: ITagLinkGetAllRequestDTO): Promise<ITagLinkGetAllResponseDTO> {
    const result = await this.tagRepo.tagLinkGetAll(tagLinkGetAllRequestDTO);

    if (!result) throw new RequestError('Tag link does not exist', 404, { message: '404 Not Found' });

    return result;
  }
}
