import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { RequestError } from '@shared/errors/RequestError';
import { IUserBookmarkUserCreateRequest } from './interfaces/IUserBookmarkUserCreateRequest';
import { IUserBookmarkUserCreateResponse } from './interfaces/IUserBookmarkUserCreateResponse';

export interface IUserBookmarkUserCreateUseCase {
  execute: (userBookmarkUserCreateRequest: IUserBookmarkUserCreateRequest) => Promise<IUserBookmarkUserCreateResponse>;
}

export class UserBookmarkUserCreateUseCase implements IUserBookmarkUserCreateUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userBookmarkUserCreateRequest: IUserBookmarkUserCreateRequest): Promise<IUserBookmarkUserCreateResponse> {
    const { session, bookmarkId, userId } = userBookmarkUserCreateRequest;

    const bookmark = await this.userRepo.userBookmarkGetOneByBookmarkIdUserId({
      sessionId: session?.id,
      userId: session?.id,
      bookmarkId,
    });
    if (!bookmark) throw new RequestError('You can not send this bookmark', 400, { message: '400 Bad Request' });

    try {
      await this.userRepo.userBookmarkUserCreate({
        sessionId: session?.id,
        bookmarkId,
        userId,
      });
    } catch (error) {
      throw new RequestError('The notification was not saved', 400, { message: '400 Bad Request' });
    }

    return {
      userFrom: session?.id,
      bookmarkId,
      userTo: userId,
    };
  }
}
