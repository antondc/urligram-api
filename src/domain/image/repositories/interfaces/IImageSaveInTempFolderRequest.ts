import { FileDTO } from '@domain/image/entities/FileDTO';

export type IImageSaveInTempFolderRequest = {
  file: FileDTO;
};
