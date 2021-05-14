import { NextFunction, Request, Response } from 'express';
import multer from 'multer';

import { FileDTO } from '@domain/file/entities/FileDTO';

export class FileHandler {
  static handleSingleFile(fieldName) {
    const multerInstance = multer();
    const retrieveSingleImage = multerInstance.single(fieldName);

    return retrieveSingleImage;
  }

  // We want our files complying with our own interface
  static wrapSingleFile(req: Request, _: Response, next: NextFunction) {
    const { file } = req;
    const mappedFiles: FileDTO = {
      name: file.originalname,
      type: file.mimetype,
      content: file.buffer,
      size: file.size,
      extension: `${file.originalname.split('.').pop()}`,
    };
    Object.assign(req.body, {
      file: mappedFiles,
    });

    return next();
  }
}
