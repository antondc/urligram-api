import { defaultDecoder, parse, ParsedQs, stringify } from 'qs';

export class QueryStringWrapper {
  static decoder(str: string, defaultDecoder: defaultDecoder, b: unknown, type: string): string | number | ParsedQs {
    if (type === 'value' && !isNaN(Number(str))) return Number(str);

    return defaultDecoder(str);
  }

  static parseQueryString(string: string): Record<string, unknown> {
    const queryParams = parse(string.replace(/^\?/, ''), {
      decoder: QueryStringWrapper.decoder,
    });

    return queryParams;
  }

  static stringifyQueryParams(params: Record<string, unknown>): string {
    const queryParams = stringify(params, {
      arrayFormat: 'brackets',
    });

    return decodeURIComponent(queryParams);
  }
}
