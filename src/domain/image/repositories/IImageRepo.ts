import { IImageSaveOneRequest } from './interfaces/IImageSaveOneRequest';
import { IImageSaveOneResponse } from './interfaces/IImageSaveOneResponse';

export interface IImageRepo {
  saveImage: (IImageSaveOneRequest: IImageSaveOneRequest) => Promise<IImageSaveOneResponse>;
  deleteImage: () => Promise<void>;
}
