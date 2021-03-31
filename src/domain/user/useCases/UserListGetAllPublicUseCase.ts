import { IListRepo } from '@domain/list/repositories/IListRepo';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { RequestError } from '@shared/errors/RequestError';
import { IUserListGetAllPublicRequest } from './interfaces/IUserListGetAllPublicRequest';
import { IUserListGetAllPublicResponse } from './interfaces/IUserListGetAllPublicResponse';

export interface IUserListGetAllPublicUseCase {
  execute: (userListGetAllPublicRequest: IUserListGetAllPublicRequest) => Promise<IUserListGetAllPublicResponse>;
}

export class UserListGetAllPublicUseCase implements IUserListGetAllPublicUseCase {
  private userRepo: IUserRepo;
  private listRepo: IListRepo;

  constructor(userRepo: IUserRepo, listRepo: IListRepo) {
    this.userRepo = userRepo;
    this.listRepo = listRepo;
  }

  public async execute(userListGetAllPublicRequest: IUserListGetAllPublicRequest): Promise<IUserListGetAllPublicResponse> {
    const { userId, session, sort, size, offset, filter } = userListGetAllPublicRequest;

    const user = await this.userRepo.userGetOne({ sessionId: session?.id, userId });
    if (!user) throw new RequestError('User not found', 404, { message: '404 Not Found' });

    const { lists, meta } = await this.userRepo.userListGetAllPublic({ userId, sessionId: session?.id, sort, size, offset, filter });

    const listsWithTagsPromises = lists.map(async (item) => {
      const tags = await this.listRepo.listTagsGetAll({ listId: item.id, sessionId: session?.id });

      return {
        ...item,
        tags,
      };
    });

    const listsWithTags = await Promise.all(listsWithTagsPromises);

    return {
      lists: listsWithTags,
      meta,
    };
  }
}

/* --- DOC ---
  Returns a collection of lists
  Exceptions:
    (1) There is no user
  Returns
    (2) List is public
    (3) List is private but user is within it
*/
