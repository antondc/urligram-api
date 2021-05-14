import { Magic } from 'mmmagic';

import { IFileRepo } from '../repositories/IFileRepo';
import { FileDTO } from './FileDTO';
import { IFileSaveInTempFolderRequest } from './interfaces/IFileSaveInTempFolderRequest';
import { IFileSaveInTempFolderResponse } from './interfaces/IFileSaveInTempFolderResponse';

export interface FileConstructorProps {
  file?: FileDTO;
  fileRepo?: IFileRepo;
}

export class File extends FileDTO {
  file?: FileDTO;
  fileRepo?: IFileRepo;

  constructor(constructorProps?: FileConstructorProps) {
    super();
    this.file = constructorProps?.file;
    this.fileRepo = constructorProps?.fileRepo;
  }

  async fileSaveInTempFolder(fileSaveInTempFolderRequest: IFileSaveInTempFolderRequest): Promise<IFileSaveInTempFolderResponse> {
    const { file } = fileSaveInTempFolderRequest;

    const { path } = await this.fileRepo.fileSaveInTempFolder({ file });

    return { path };
  }

  async detectMimeType(): Promise<string> {
    const magic = new Magic();

    const magicPromise: string = await new Promise((resolve, reject) => {
      magic.detect(this.file.content, (err, result: string) => {
        if (err) reject;

        return resolve(result);
      });
    });

    return magicPromise;
  }

  deleteFile = (): void => {
    // Remove image from filesystem
    // This may go to a more general File class

    return null;
  };
}
