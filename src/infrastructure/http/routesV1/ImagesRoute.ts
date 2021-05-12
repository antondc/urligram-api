import express, { NextFunction, Request, Response } from 'express';

import { ImageUploadOneUseCase } from '@domain/image/useCases/ImageUploadOneUseCase';
import { ImageUploadOneController } from '@infrastructure/http/controllers/ImageUploadOneController';
import { FileHandler } from '@infrastructure/http/middlewares/FileHandler';
import { ImageFileSystemRepo } from '@infrastructure/persistence/fileSystem/repositories/ImageFileSystemRepo';
const ImagesRoute = express.Router();

ImagesRoute.post(
  '/upload/single',
  FileHandler.handleSingleFile('image'),
  FileHandler.wrapSingleFile,
  async (req: Request, res: Response, next: NextFunction) => {
    const imageFileSystemRepo = new ImageFileSystemRepo();

    const imageUploadOneUseCase = new ImageUploadOneUseCase(imageFileSystemRepo);
    const imageUploadOneController = new ImageUploadOneController(imageUploadOneUseCase);

    const response = await imageUploadOneController.execute(req, res, next);

    return response;
  }
);

export { ImagesRoute };
