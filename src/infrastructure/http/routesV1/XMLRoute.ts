import express, { NextFunction, Request, Response } from 'express';

import { LanguageGetAllUseCase } from '@domain/language/useCases/LanguageGetAllUseCase';
import { XmlSitemapGetAllUseCase } from '@domain/xml/useCases/XmlSitemapGetAllUseCase';
import { XmlSitemapGetAllController } from '@infrastructure/http/controllers/XmlSitemapGetAllController';
import { LanguageRepo } from '@infrastructure/persistence/mySQL/repositories/LanguageRepo';

const XmlRoute = express.Router({ mergeParams: true });

XmlRoute.get('/sitemap', async (req: Request, res: Response, next: NextFunction) => {
  const languageRepo = new LanguageRepo();
  const languageGetAllUseCase = new LanguageGetAllUseCase(languageRepo);
  const xmlSitemapGetOneUseCase = new XmlSitemapGetAllUseCase(languageGetAllUseCase);
  const xmlSitemapGetOneController = new XmlSitemapGetAllController(xmlSitemapGetOneUseCase);

  const response = await xmlSitemapGetOneController.execute(req, res, next);

  return response;
});

export { XmlRoute };
