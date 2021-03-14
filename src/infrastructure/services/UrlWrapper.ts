import psl from 'psl';

import { getNested } from '@tools/helpers/object/getNested';
import { mergeDeep } from '@tools/helpers/object/mergeDeep';
import { omit } from '@tools/helpers/object/omit';
import { addDefaultHttps } from '@tools/helpers/url/AddDefaultHttps';
import { QueryStringWrapper } from './QueryStringWrapper';

const DEFAULT_URL = 'example.com';

export class URLWrapper {
  private url: URL;
  private host: string;
  private path: string;
  private search: string;
  private searchParams: URLSearchParams;
  private searchParamsObject: Record<string, any>;

  constructor(rawURL: string) {
    this.instantiateURL(rawURL);
  }

  instantiateURL(rawURL: string): void {
    try {
      let formattedURL;

      // Test for cases when url is malformed
      switch (true) {
        case rawURL === '':
          formattedURL = DEFAULT_URL;
          break;
        case rawURL === '/':
          formattedURL = DEFAULT_URL;
          break;
        case rawURL.startsWith('/'):
          formattedURL = `${DEFAULT_URL}${rawURL}`;
          break;

        default:
          formattedURL = rawURL;
          break;
      }

      const URLWithProtocol = addDefaultHttps(formattedURL);

      const url = new URL(URLWithProtocol);

      this.url = url;
      this.host = url.hostname;
      this.path = url.pathname;
      this.search = this.url.search;
      this.searchParams = this.url.searchParams;
      this.searchParamsObject = this.getSearchParamAll();
    } catch (err) {
      console.error('Un-parsable URL', err);
    }
  }

  getHref(): string | undefined {
    return this.url?.href;
  }

  getPathName(): string | undefined {
    return this.url.pathname;
  }

  getPath(): string | undefined {
    return this.path;
  }

  getDomain(): string | undefined {
    return this.host;
  }

  getDomainWithoutSubdomain(): string {
    return psl.get(this.url.hostname);
  }

  getSearchString(): string | undefined {
    return this.search;
  }

  getPathAndSearch(): string | undefined {
    return `${this.getPath()}${this.getSearchString()}`;
  }

  upsertSearchParams(params: Record<string, unknown>): string {
    const alreadyParams = QueryStringWrapper.parseQueryString(this.url.search);

    const paramsEnhanced = mergeDeep<Record<string, unknown>>(alreadyParams, params);
    this.searchParamsObject = paramsEnhanced;
    const stringifiedParams = QueryStringWrapper.stringifyQueryParams(paramsEnhanced);
    const updatedURL = `${this.getDomain()}${this.getPath()}?${stringifiedParams}`;

    this.instantiateURL(updatedURL);

    return this.getSearchString();
  }

  getSearchParamOne(path: string): any {
    return getNested(this.searchParamsObject, path);
  }

  getSearchParamAll(): Record<string, unknown> {
    return QueryStringWrapper.parseQueryString(this.url.search);
  }

  deleteSearchParam(path: string): string {
    const params = this.getSearchParamAll();
    const paramsWithoutOmmitedValue = omit(params, [path]);
    const stringifiedParams = QueryStringWrapper.stringifyQueryParams(paramsWithoutOmmitedValue);
    const updatedURL = `${this.getDomain()}${this.getPath()}?${stringifiedParams}`;

    this.instantiateURL(updatedURL);

    return this.getSearchString();
  }
}
