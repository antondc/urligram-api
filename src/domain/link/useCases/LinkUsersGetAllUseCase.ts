import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { User } from '@domain/user/entities/User';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { RequestError } from '@shared/errors/RequestError';
import { ILinkUsersGetAllRequest } from './interfaces/ILinkUsersGetAllRequest';
import { ILinkUsersGetAllResponse } from './interfaces/ILinkUsersGetAllResponse';

export interface ILinkUsersGetAllUseCase {
  execute: (linkUsersGetIdsRequest: ILinkUsersGetAllRequest) => Promise<ILinkUsersGetAllResponse>;
}

export class LinkUsersGetAllUseCase implements ILinkUsersGetAllUseCase {
  private linkRepo: ILinkRepo;
  private userRepo: IUserRepo;

  constructor(linkRepo: ILinkRepo, userRepo: IUserRepo) {
    this.linkRepo = linkRepo;
    this.userRepo = userRepo;
  }

  public async execute(linkUsersGetIdsRequest: ILinkUsersGetAllRequest): Promise<ILinkUsersGetAllResponse> {
    const { session, linkId, sort, size, offset } = linkUsersGetIdsRequest;

    const userIds = await this.linkRepo.linkUsersGetIds({ userId: session?.id, linkId });
    if (!userIds) throw new RequestError('Link does not exist', 404, { message: '404 Not Found' });

    const { usersData, meta } = await this.userRepo.userGetByIds({ sessionId: session?.id, userIds, sort, size, offset });
    const users = usersData.map((item) => new User(item));

    return {
      users,
      meta,
    };
  }
}
