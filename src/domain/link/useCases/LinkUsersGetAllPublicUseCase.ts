import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { RequestError } from '@shared/errors/RequestError';
import { ILinkUsersGetAllPublicRequest } from './interfaces/ILinkUsersGetAllPublicRequest';
import { ILinkUsersGetAllPublicResponse } from './interfaces/ILinkUsersGetAllPublicResponse';

export interface ILinkUsersGetAllPublicUseCase {
  execute: (linkUsersGetAllRequest: ILinkUsersGetAllPublicRequest) => Promise<ILinkUsersGetAllPublicResponse>;
}

export class LinkUsersGetAllPublicUseCase implements ILinkUsersGetAllPublicUseCase {
  private linkRepo: ILinkRepo;

  constructor(linkRepo: ILinkRepo) {
    this.linkRepo = linkRepo;
  }

  public async execute(linkUsersGetAllRequest: ILinkUsersGetAllPublicRequest): Promise<ILinkUsersGetAllPublicResponse> {
    const result = await this.linkRepo.linkUsersGetAll(linkUsersGetAllRequest);

    if (!result) throw new RequestError('Link does not exist', 404, { message: '404 Not Found' });

    return result;
  }
}
