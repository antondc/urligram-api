import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { ILinkUpsertOneRequest } from '@domain/link/useCases/interfaces/ILinkUpsertOneRequest';
import { ILinkUpsertOneResponse } from '@domain/link/useCases/interfaces/ILinkUpsertOneResponse';
import { RequestError } from '@shared/errors/RequestError';
import HtmlScrapper from '@shared/services/HtmlScrapper';
import HttpClient from '@shared/services/HttpClient';
import { URLWrapper } from '@shared/services/UrlWrapper';
import { testStringIsValidUrl } from '@tools/helpers/url/testStringIsValidUrl';

export interface ILinkUpsertOneUseCase {
  execute: (bookmarkUpsertOneRequest: ILinkUpsertOneRequest) => Promise<ILinkUpsertOneResponse>;
}

export class LinkUpsertOneUseCase implements ILinkUpsertOneUseCase {
  private linkRepo: ILinkRepo;

  constructor(linkRepo: ILinkRepo) {
    this.linkRepo = linkRepo;
  }

  public async execute(bookmarkUpsertOneRequest: ILinkUpsertOneRequest): Promise<ILinkUpsertOneResponse> {
    const { session, url, alternativeTitle } = bookmarkUpsertOneRequest;

    const stringIsValidUrl = testStringIsValidUrl(url);
    if (!stringIsValidUrl) throw new RequestError('Url is not valid', 409, { message: '409 Conflict' });

    const parsedUrl = new URLWrapper(url);
    const origin = parsedUrl.getOrigin();
    const path = parsedUrl.getPathAndSearch();

    try {
      const html: string = await HttpClient.get(url);
      const htmlScraper = new HtmlScrapper(html);
      const title = htmlScraper.getTitle();
      const description = htmlScraper.getDescription();
      const language = htmlScraper.getLanguage();
      const image = htmlScraper.getImage();
      const favicon = htmlScraper.getFavicon(origin);

      const upsertedLink = await this.linkRepo.linkUpsertOne({
        path,
        domain: origin,
        title,
        description,
        image,
        favicon,
        language,
      });
      const link = await this.linkRepo.linkGetOne({ linkId: upsertedLink?.id, userId: session?.id });
      if (!link?.id) throw new RequestError('Link creation failed', 500, { message: '500 Server Error' });

      return link;
    } catch (err) {
      const upsertedLink = await this.linkRepo.linkUpsertOne({
        path,
        domain: origin,
        title: alternativeTitle,
        description: '',
        image: '',
        favicon: '',
        language: '',
      });
      const link = await this.linkRepo.linkGetOne({ linkId: upsertedLink?.id, userId: session?.id });
      if (!link?.id) throw new RequestError('Link creation failed', 500, { message: '500 Server Error' });

      return link;
    }
  }
}
