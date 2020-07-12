import { IListCreateRequestDTO } from '@domain/list/dto/IListCreateRequestDTO';
import { IListCreateResponseDTO } from '@domain/list/dto/IListCreateResponseDTO';
import { IListRepo } from '@domain/list/repositories/IListRepo';
import { RequestError } from '@shared/errors/RequestError';

export interface IListCreateUseCase {
  execute: (listCreateRequestDTO: IListCreateRequestDTO) => Promise<IListCreateResponseDTO>;
}

export class ListCreateUseCase implements IListCreateUseCase {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  public async execute(listCreateRequestDTO: IListCreateRequestDTO): Promise<IListCreateResponseDTO> {
    const { session } = listCreateRequestDTO;
    const listExists = await this.listRepo.listGetOne({ ...listCreateRequestDTO, userId: session?.id });

    if (!!listExists) throw new RequestError('List already exists', 409, { message: '409 Conflict' });

    const result = await this.listRepo.listCreate({ ...listCreateRequestDTO, userId: session?.id });

    const response = await this.listRepo.listGetOne({ id: Number(result?.id) });

    return response;
  }
}
