import { ILanguageGetAllUseCase } from '@domain/language/useCases/LanguageGetAllUseCase';
import { IXmlSitemapGetAllResponse } from '@domain/xml/useCases/interfaces/IXmlSitemapGetAllResponse';
import { ENDPOINT_CLIENT } from '@shared/constants/env';
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

    const bookmarks = {
      url: `${ENDPOINT_CLIENT}/bookmarks`,
      date: defaultLanguage.updatedAt,
      changeFreq: 'hourly',
      priority: 0.9,
    };

    const bookmarksWithLanguages = languages.map((language) => {
      return {
        url: `${ENDPOINT_CLIENT}/${language.slug}/bookmarks`,
        date: language.updatedAt,
        changeFreq: 'hourly',
        priority: 0.8,
      };
    });

    const users = {
      url: `${ENDPOINT_CLIENT}/users`,
      date: defaultLanguage.updatedAt,
      changeFreq: 'hourly',
      priority: 0.9,
    };

    const usersWithLanguages = languages.map((language) => {
      return {
        url: `${ENDPOINT_CLIENT}/${language.slug}/users`,
        date: language.updatedAt,
        changeFreq: 'hourly',
        priority: 0.8,
      };
    });
    const followers = {
      url: `${ENDPOINT_CLIENT}/followers`,
      date: defaultLanguage.updatedAt,
      changeFreq: 'hourly',
      priority: 0.9,
    };

    const followersWithLanguages = languages.map((language) => {
      return {
        url: `${ENDPOINT_CLIENT}/${language.slug}/followers`,
        date: language.updatedAt,
        changeFreq: 'hourly',
        priority: 0.8,
      };
    });
    const following = {
      url: `${ENDPOINT_CLIENT}/following`,
      date: defaultLanguage.updatedAt,
      changeFreq: 'hourly',
      priority: 0.9,
    };

    const followingWithLanguages = languages.map((language) => {
      return {
        url: `${ENDPOINT_CLIENT}/${language.slug}/following`,
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

    const docs = {
      url: `${ENDPOINT_CLIENT}/docs`,
      date: defaultLanguage.updatedAt,
      changeFreq: 'hourly',
      priority: 0.9,
    };

    const xmlSitemapService = new XmlSitemapService();
    const rssFeed = xmlSitemapService.createFeed({
      items: [
        home,
        ...(homeWithLanguages || []),
        bookmarks,
        ...(bookmarksWithLanguages || []),
        users,
        ...(usersWithLanguages || []),
        followers,
        ...(followersWithLanguages || []),
        following,
        ...(followingWithLanguages || []),
        lists,
        ...(listsWithLanguages || []),
        tags,
        ...(tagsWithLanguages || []),
        docs,
      ],
    });

    return rssFeed;
  }
}
