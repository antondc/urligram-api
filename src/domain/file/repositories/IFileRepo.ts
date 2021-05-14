import { IFileSaveInTempFolderRequest } from './interfaces/IFileSaveInTempFolderRequest';
import { IFileSaveInTempFolderResponse } from './interfaces/IFileSaveInTempFolderResponse';
import { IImageSaveOneRequest } from './interfaces/IFileSaveOneRequest';
import { IImageSaveOneResponse } from './interfaces/IFileSaveOneResponse';

export interface IFileRepo {
  imageSave: (IImageSaveOneRequest: IImageSaveOneRequest) => Promise<IImageSaveOneResponse>;
  imageDelete: () => Promise<void>;
  fileSaveInTempFolder: (fileSaveInTempFolderRequest: IFileSaveInTempFolderRequest) => Promise<IFileSaveInTempFolderResponse>;
}
