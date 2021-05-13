import { ITagRepo } from '@domain/tag/repositories/ITagRepo';
import { User } from '@domain/user/entities/User';
import { ITagUserGetAllPublicRequest } from './interfaces/ITagUserGetAllPublicRequest';
import { ITagUserGetAllPublicResponse } from './interfaces/ITagUserGetAllPublicResponse';

export interface ITagUserGetAllPublicUseCase {
  execute: (tagUserGetAllPublic: ITagUserGetAllPublicRequest) => Promise<ITagUserGetAllPublicResponse>;
}

export class TagUserGetAllPublicUseCase implements ITagUserGetAllPublicUseCase {
  private tagRepo: ITagRepo;

  constructor(tagRepo: ITagRepo) {
    this.tagRepo = tagRepo;
  }

  public async execute(tagUserGetAllPublic: ITagUserGetAllPublicRequest): Promise<ITagUserGetAllPublicResponse> {
    const { tagId } = tagUserGetAllPublic;

    const usersData = await this.tagRepo.tagUserGetAllPublic({ tagId });

    const users = usersData.map((userData) => {
      const user = new User(userData);

      return user;
    });

    return users;
  }
}
