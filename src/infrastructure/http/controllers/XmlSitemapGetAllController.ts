import { Request, Response } from 'express';

import { IXmlSitemapGetAllUseCase } from '@domain/xml/useCases/XmlSitemapGetAllUseCase';
import { BaseController } from './BaseController';

export class XmlSitemapGetAllController extends BaseController {
  useCase: IXmlSitemapGetAllUseCase;

  constructor(useCase: IXmlSitemapGetAllUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const response = await this.useCase.execute();

    return res.status(200).set('Content-Type', 'text/xml').send(response);
  }
}
