export type LawStatus = 'Amalda' | 'O‘zgartirilgan' | 'Kuchini yo‘qotgan';

export interface Article {
  id: string;
  number: string;
  title?: string;
  content: string;
}

export interface Law {
  id: string;
  title: string;
  shortTitle: string;
  type: string; // e.g., "Qonun", "Kodeks", "Prezident Farmoni", "Vazirlar Mahkamasi Qarori"
  adoptedDate: string;
  status: LawStatus;
  category: string; // matches the categories list
  articles: Article[];
  sourceUrl?: string;
  saved?: boolean;
}

export interface SearchQuery {
  text: string;
  category?: string;
  type?: string;
}
