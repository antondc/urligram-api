import { URLWrapper } from '@antoniodcorrea/utils';
import { addDefaultHttps, testStringIsValidUrl } from '@antoniodcorrea/utils';
import { DEFAULT_LANGUAGE_SLUG, DEFAULT_REQUEST_TIMEOUT } from '@shared/constants/constants';
import { RequestError } from '@shared/errors/RequestError';
import HtmlScrapper from '@shared/services/HtmlScrapper';
import { HttpClient } from '@shared/services/HttpClient';
import { ILinkRequestInfoRequest } from './interfaces/ILinkRequestInfoRequest';
import { ILinkRequestInfoResponse } from './interfaces/ILinkRequestInfoResponse';

export interface ILinkRequestInfoUseCase {
  execute: (linkRequestInfoRequest: ILinkRequestInfoRequest) => Promise<ILinkRequestInfoResponse>;
}

export class LinkRequestInfoUseCase implements ILinkRequestInfoUseCase {
  public async execute(linkRequestInfoRequest: ILinkRequestInfoRequest): Promise<ILinkRequestInfoResponse> {
    const { url } = linkRequestInfoRequest;

    if (!url) throw new RequestError('Url missing', 400, { message: '400 Bad request' });

    const urlWithDefaultProtocol = addDefaultHttps(url);
    const stringIsValidUrl = testStringIsValidUrl(urlWithDefaultProtocol);
    if (!stringIsValidUrl) throw new RequestError('Url is not valid', 409, { message: '409 Conflict' });

    const parsedUrl = new URLWrapper(urlWithDefaultProtocol);
    const origin = parsedUrl.getOrigin();

    try {
      const httpClient = new HttpClient({ timeout: DEFAULT_REQUEST_TIMEOUT, contentType: 'html' });
      const html: string = await httpClient.publicInstance.get(urlWithDefaultProtocol);
      const htmlScraper = new HtmlScrapper(html);
      const title = htmlScraper.getTitle();
      const description = htmlScraper.getDescription();
      const language = htmlScraper.getLanguage();
      const image = htmlScraper.getImage();
      const favicon = htmlScraper.getFavicon(origin);

      return {
        title,
        description,
        language,
        image,
        favicon,
      };
    } catch {
      const htmlScraper = new HtmlScrapper('');
      const favicon = htmlScraper.getDefaultFavicon(origin);
      const defaultLanguageSlug = DEFAULT_LANGUAGE_SLUG;

      return {
        favicon,
        language: defaultLanguageSlug,
      };
    }
  }
}
