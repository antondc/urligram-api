import { Glossary } from './Glossary';

export class Language {
  id: number;
  slug: string;
  name: string;
  isDefault: boolean;
  loading?: boolean;
  glossary: Glossary;
  updatedAt: Date;

  constructor(options) {
    this.id = options.id;
    this.slug = options.slug;
    this.name = options.name;
    this.isDefault = options.isDefault;
    this.loading = options.loading;
    this.glossary = options.glossary;
    this.updatedAt = options.updatedAt;
  }
}
