import { ILinkRepo } from '@domain/link/repositories/ILinkRepo';
import { ILinkUpsertOneRequest } from '@domain/link/useCases/interfaces/ILinkUpsertOneRequest';
import { ILinkUpsertOneResponse } from '@domain/link/useCases/interfaces/ILinkUpsertOneResponse';
import { RequestError } from '@shared/errors/RequestError';
import { URLWrapper } from '@shared/services/UrlWrapper';
import { addDefaultHttps } from '@tools/helpers/url/addDefaultHttps';
import { testStringIsValidUrl } from '@tools/helpers/url/testStringIsValidUrl';
import { ILinkRequestInfoUseCase } from './LinkRequestInfoUseCase';

export interface ILinkUpsertOneUseCase {
  execute: (bookmarkUpsertOneRequest: ILinkUpsertOneRequest) => Promise<ILinkUpsertOneResponse>;
}

export class LinkUpsertOneUseCase implements ILinkUpsertOneUseCase {
  private linkRepo: ILinkRepo;
  private linkRequestInfoUseCase: ILinkRequestInfoUseCase;

  constructor(linkRepo: ILinkRepo, linkRequestInfoUseCase: ILinkRequestInfoUseCase) {
    this.linkRepo = linkRepo;
    this.linkRequestInfoUseCase = linkRequestInfoUseCase;
  }

  public async execute(bookmarkUpsertOneRequest: ILinkUpsertOneRequest): Promise<ILinkUpsertOneResponse> {
    const { session, url, alternativeTitle } = bookmarkUpsertOneRequest;

    const urlWithDefaultProtocol = addDefaultHttps(url);
    const stringIsValidUrl = testStringIsValidUrl(urlWithDefaultProtocol);
    if (!stringIsValidUrl) throw new RequestError('Url is not valid', 409, { message: '409 Conflict' });

    const parsedUrl = new URLWrapper(url);
    const origin = parsedUrl.getOrigin();
    const path = parsedUrl.getPathAndSearch();

    const { title = alternativeTitle, description = '', image = '', favicon, language } = await this.linkRequestInfoUseCase.execute({ url });

    const upsertedLink = await this.linkRepo.linkUpsertOne({
      path,
      domain: origin,
      title: title,
      description: description,
      image: image,
      favicon: favicon,
      language: language,
    });
    const link = await this.linkRepo.linkGetOne({ linkId: upsertedLink?.id, sessionId: session?.id });
    if (!link?.id) throw new RequestError('Link creation failed', 500, { message: '500 Server Error' });

    return link;
  }
}
