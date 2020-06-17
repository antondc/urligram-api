export interface IGetLanguagesResponseDTO {
  id: number;
  slug: string;
  name: string;
  isDefault: boolean;
  loading?: boolean;
  glossary: {
    Home: string;
    Login: string;
    LogOut: string;
    Control: string;
    NotFound: string;
    Tags: string;
    Trending: string;
    Lists: string;
  };
}
