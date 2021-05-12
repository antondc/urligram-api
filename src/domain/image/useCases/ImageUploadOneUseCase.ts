import { RequestError } from '@shared/errors/RequestError';
import { IImageRepo } from '../repositories/IImageRepo';
import { IImageUploadOneRequest } from './interfaces/IImageUploadOneRequest';
import { IImageUploadOneResponse } from './interfaces/IImageUploadOneResponse';

export interface IImageUploadOneUseCase {
  execute: (imageUploadOneRequest: IImageUploadOneRequest) => Promise<IImageUploadOneResponse>;
}

export class ImageUploadOneUseCase implements IImageUploadOneUseCase {
  private imageRepo: IImageRepo;

  constructor(imageRepo: IImageRepo) {
    this.imageRepo = imageRepo;
  }
  public async execute(imageUploadOneRequest: IImageUploadOneRequest): Promise<IImageUploadOneResponse> {
    const { file } = imageUploadOneRequest;
    if (file.extension !== 'jpg' && file.extension !== 'png') throw new RequestError('Wrong image format', 400);
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') throw new RequestError('Wrong file type', 400);

    const { path } = await this.imageRepo.imageSaveInTempFolder({ file });

    return {
      ...file,
      path,
    };
  }
}
