import { IImageSaveInTempFolderRequest } from './interfaces/IImageSaveInTempFolderRequest';
import { IImageSaveInTempFolderResponse } from './interfaces/IImageSaveInTempFolderResponse';
import { IImageSaveOneRequest } from './interfaces/IImageSaveOneRequest';
import { IImageSaveOneResponse } from './interfaces/IImageSaveOneResponse';

export interface IImageRepo {
  saveImage: (IImageSaveOneRequest: IImageSaveOneRequest) => Promise<IImageSaveOneResponse>;
  deleteImage: () => Promise<void>;
  imageSaveInTempFolder: (imageSaveInTempFolder: IImageSaveInTempFolderRequest) => Promise<IImageSaveInTempFolderResponse>;
}
