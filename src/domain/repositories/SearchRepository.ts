import { SearchQuery } from '../entities/SearchQuery';

export type SearchResultItem = {
  id: string;
  title: string;
  description?: string;
};

export interface SearchRepository {
  search(query: SearchQuery): Promise<SearchResultItem[]>;
}


