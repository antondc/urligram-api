import { DEFAULT_LANGUAGE } from '@shared/constants/constants';
import { RequestError } from '@shared/errors/RequestError';
import HtmlScrapper from '@shared/services/HtmlScrapper';
import HttpClient from '@shared/services/HttpClient';
import { URLWrapper } from '@shared/services/UrlWrapper';
import { addDefaultHttps } from '@tools/helpers/url/addDefaultHttps';
import { testStringIsValidUrl } from '@tools/helpers/url/testStringIsValidUrl';
import { ILinkRequestInfoRequest } from './interfaces/ILinkRequestInfoRequest';
import { ILinkRequestInfoResponse } from './interfaces/ILinkRequestInfoResponse';

export interface ILinkRequestInfoUseCase {
  execute: (linkRequestInfoRequest: ILinkRequestInfoRequest) => Promise<ILinkRequestInfoResponse>;
}

export class LinkRequestInfoUseCase implements ILinkRequestInfoUseCase {
  public async execute(linkRequestInfoRequest: ILinkRequestInfoRequest): Promise<ILinkRequestInfoResponse> {
    const { url } = linkRequestInfoRequest;

    const urlWithDefaultProtocol = addDefaultHttps(url);
    const stringIsValidUrl = testStringIsValidUrl(urlWithDefaultProtocol);
    if (!stringIsValidUrl) throw new RequestError('Url is not valid', 409, { message: '409 Conflict' });

    const parsedUrl = new URLWrapper(urlWithDefaultProtocol);
    const origin = parsedUrl.getOrigin();

    try {
      const html: string = await HttpClient.get(urlWithDefaultProtocol);
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
      const defaultLanguage = DEFAULT_LANGUAGE;

      return {
        favicon,
        language: defaultLanguage,
      };
    }
  }
}
