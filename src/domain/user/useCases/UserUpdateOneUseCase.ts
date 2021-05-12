import { Image } from '@domain/image/entities/Image';
import { IImageRepo } from '@domain/image/repositories/IImageRepo';
import { userImageFormat } from '@domain/user/entities/User';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { RequestError } from '@shared/errors/RequestError';
import { UserError } from '@shared/errors/UserError';
import { StringValidator } from '@shared/services/StringValidator';
import { IUserUpdateOneRequest } from './interfaces/IUserUpdateOneRequest';
import { IUserUpdateOneResponse } from './interfaces/IUserUpdateOneResponse';

export interface IUserUpdateOneUseCase {
  execute: (userUpdateRequest: IUserUpdateOneRequest) => Promise<IUserUpdateOneResponse>;
}

export class UserUpdateOneUseCase implements IUserUpdateOneUseCase {
  private userRepo: IUserRepo;
  private imageRepo: IImageRepo;

  constructor(userRepo: IUserRepo, imageRepo: IImageRepo) {
    this.userRepo = userRepo;
    this.imageRepo = imageRepo;
  }

  public async execute(userUpdateRequest: IUserUpdateOneRequest): Promise<IUserUpdateOneResponse> {
    const { email, name, session, image } = userUpdateRequest;

    const isEmail = StringValidator.validateEmailAddress(email);
    if (!isEmail) throw new UserError('Email incorrect', 409);

    const userExists = await this.userRepo.userGetOne({ sessionId: session?.id, email, name });
    if (!userExists) throw new RequestError('User does not exist', 404);

    const userImageEntity = new Image(this.imageRepo);
    const savedImage = await userImageEntity.saveImage({ fileUrl: image, formatOptions: userImageFormat });

    await this.userRepo.userUpdateOne({ ...userUpdateRequest, userId: session?.id, image: savedImage?.path });

    const response = await this.userRepo.userGetOne({ sessionId: session?.id, userId: session?.id });

    return response;
  }
}
