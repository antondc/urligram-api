import { defaultDecoder, parse, ParsedQs, stringify } from 'qs';

import { getNested } from '@tools/helpers/object/getNested';
import { mergeDeep } from '@tools/helpers/object/mergeDeep';
import { omit } from '@tools/helpers/object/omit';

export class QueryStringWrapper {
  static extractQueryString(string: string): string {
    return string.split('?')[1] || '';
  }

  static decoder(str: string, defaultDecoder: defaultDecoder, b: unknown, type: string): string | number | ParsedQs {
    if (type === 'value' && !isNaN(Number(str))) return Number(str);

    return defaultDecoder(str);
  }

  static parseQueryString(string = ''): Record<string, unknown> {
    const queryParams = parse(string.replace(/^\?/, ''), {
      decoder: QueryStringWrapper.decoder,
    });

    return queryParams;
  }

  static stringifyQueryParams(params: Record<string, unknown> = {}): string {
    const queryParams = stringify(params, {
      arrayFormat: 'brackets',
    });

    return decodeURIComponent(queryParams);
  }

  static upsertSearchParams(string: string, newParams: Record<string, unknown>): string {
    const alreadyParams = QueryStringWrapper.parseQueryString(string);

    const paramsEnhanced = mergeDeep<Record<string, unknown>>(alreadyParams, newParams);
    const stringifiedParams = QueryStringWrapper.stringifyQueryParams(paramsEnhanced);

    return stringifiedParams;
  }

  static deleteSearchParam(queryString: string, path: string): string {
    const params = QueryStringWrapper.parseQueryString(queryString);
    const paramsWithoutOmmitedValue = omit(params, [path]);
    const stringifiedParams = QueryStringWrapper.stringifyQueryParams(paramsWithoutOmmitedValue);

    return stringifiedParams;
  }

  static getOneSearchParam(queryString: string, path: string): any {
    const params = QueryStringWrapper.parseQueryString(queryString);

    return getNested(params, path);
  }
}
