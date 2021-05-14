import { existsSync, lstatSync, readdirSync, unlinkSync } from 'fs';
import { Magic } from 'mmmagic';
import path from 'path';

import config from '@root/config.test.json';
import { URLWrapper } from '@shared/services/UrlWrapper';
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

  deleteFile = (url: string): void => {
    const urlWrapper = new URLWrapper(url);
    const filename = urlWrapper.getFilename();
    const rootPath = config.MEDIA_FOLDER;

    this.removeFileRecursive(rootPath, filename);

    return;
  };

  removeFileRecursive(startPath, targetFileName) {
    const files = readdirSync(startPath);

    files.forEach((item) => {
      const checkedFilePath = path.join(startPath, item);
      const stat = lstatSync(checkedFilePath);
      const contentItemIsDirectory = stat.isDirectory();
      const filePathIncludesFileName = checkedFilePath.includes(targetFileName);
      const checkedFilePathExists = existsSync(checkedFilePath);

      if (contentItemIsDirectory) this.removeFileRecursive(checkedFilePath, targetFileName);
      if (filePathIncludesFileName && checkedFilePathExists) unlinkSync(checkedFilePath);
    });
  }
}
