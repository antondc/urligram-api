import express, { NextFunction, Request, Response } from 'express';

import { ImageUploadOneUseCase } from '@domain/image/useCases/ImageUploadOneUseCase';
import { ImageUploadOneController } from '@infrastructure/http/controllers/ImageUploadOneController';

const ImagesRoute = express.Router();

ImagesRoute.post('/upload/single', async (req: Request, res: Response, next: NextFunction) => {
  const imageUploadOneUseCase = new ImageUploadOneUseCase();
  const imageUploadOneController = new ImageUploadOneController(imageUploadOneUseCase);

  const response = await imageUploadOneController.execute(req, res, next);

  return response;
});

export { ImagesRoute };
