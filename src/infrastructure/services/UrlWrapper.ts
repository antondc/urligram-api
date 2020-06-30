import { addDefaultHttps } from '@tools/helpers/url/addDefaultHttps';

export class URLWrapper {
  private readonly url: URL;
  private readonly host: string;
  private readonly path: string;
  private readonly search: string;
  private readonly params: URLSearchParams;

  constructor(rawURL: string) {
    try {
      const editedURL = addDefaultHttps(rawURL);

      const url = new URL(editedURL);
      this.url = url;
      this.host = url.hostname;
      this.path = url.pathname;
      this.search = url.search;
      this.params = new URLSearchParams(this.url.search);
    } catch (err) {
      console.error('Un-parsable URL', err);
    }
  }

  getParam(name: string): string | undefined {
    if (!this.params) return '';

    const value = this.params.get(name);

    return !value || value === 'undefined' || value === 'null' ? undefined : value;
  }

  getDomain(): string | undefined {
    return this.host;
  }

  getPath(): string | undefined {
    return this.path;
  }

  getSearch(): string | undefined {
    return this.search;
  }
}
