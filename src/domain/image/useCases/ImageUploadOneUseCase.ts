import { IImageUploadOneRequest } from './interfaces/IImageUploadOneRequest';
import { IImageUploadOneResponse } from './interfaces/IImageUploadOneResponse';

export interface IImageUploadOneUseCase {
  execute: (imageUploadOneRequest: IImageUploadOneRequest) => Promise<IImageUploadOneResponse>;
}

export class ImageUploadOneUseCase implements IImageUploadOneUseCase {
  public async execute(imageUploadOneRequest: IImageUploadOneRequest): Promise<IImageUploadOneResponse> {
    const { image } = imageUploadOneRequest;

    return {
      image,
    };
  }
}
