import { ILanguageGetAllUseCase } from '@domain/language/useCases/LanguageGetAllUseCase';
import { IXmlSitemapGetAllResponse } from '@domain/xml/useCases/interfaces/IXmlSitemapGetAllResponse';
import { ENDPOINT_CLIENT, ENDPOINT_CLIENTS } from '@shared/constants/env';
import XmlSitemapService from '@shared/services/XmlSitemapService';

export interface IXmlSitemapGetAllUseCase {
  execute: () => Promise<IXmlSitemapGetAllResponse>;
}

export class XmlSitemapGetAllUseCase implements IXmlSitemapGetAllUseCase {
  private languageGetAllUseCase: ILanguageGetAllUseCase;

  constructor(languageGetAllUseCase: ILanguageGetAllUseCase) {
    this.languageGetAllUseCase = languageGetAllUseCase;
  }

  public async execute(): Promise<IXmlSitemapGetAllResponse> {
    const languages = await this.languageGetAllUseCase.execute();
    const defaultLanguage = languages.find((item) => item.isDefault);

    const home = {
      url: `${ENDPOINT_CLIENT}`,
      date: defaultLanguage.updatedAt,
      changeFreq: 'hourly',
      priority: 1,
    };

    const homeWithLanguages = languages.map((language) => {
      return {
        url: `${ENDPOINT_CLIENT}/${language.slug}`,
        date: language.updatedAt,
        changeFreq: 'hourly',
        priority: 0.8,
      };
    });

    const about = {
      url: `${ENDPOINT_CLIENT}/about`,
      date: defaultLanguage.updatedAt,
      changeFreq: 'hourly',
      priority: 0.9,
    };

    const aboutWithLanguages = languages.map((language) => {
      return {
        url: `${ENDPOINT_CLIENT}/${language.slug}/about`,
        date: language.updatedAt,
        changeFreq: 'hourly',
        priority: 0.8,
      };
    });

    const lists = {
      url: `${ENDPOINT_CLIENT}/lists`,
      date: defaultLanguage.updatedAt,
      changeFreq: 'hourly',
      priority: 0.9,
    };

    const listsWithLanguages = languages.map((language) => {
      return {
        url: `${ENDPOINT_CLIENT}/${language.slug}/lists`,
        date: language.updatedAt,
        changeFreq: 'hourly',
        priority: 0.8,
      };
    });

    const tags = {
      url: `${ENDPOINT_CLIENT}/tags`,
      date: defaultLanguage.updatedAt,
      changeFreq: 'hourly',
      priority: 0.9,
    };

    const tagsWithLanguages = languages.map((language) => {
      return {
        url: `${ENDPOINT_CLIENT}/${language.slug}/tags`,
        date: language.updatedAt,
        changeFreq: 'hourly',
        priority: 0.8,
      };
    });

    const xmlSitemapService = new XmlSitemapService();
    const rssFeed = xmlSitemapService.createFeed({
      items: [home, ...(homeWithLanguages || []), about, ...aboutWithLanguages, lists, ...(listsWithLanguages || []), tags, ...(tagsWithLanguages || [])],
    });

    return rssFeed;
  }
}
