import { SearchRepository, SearchResultItem } from '../../../domain/repositories/SearchRepository';
import { SearchQuery } from '../../../domain/entities/SearchQuery';
import { ApiClient } from '../../../infra/http/apiClient';

export class HttpSearchRepository implements SearchRepository {
  private readonly client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  search(query: SearchQuery): Promise<SearchResultItem[]> {
    return this.client.get<SearchResultItem[]>(`/search?q=${encodeURIComponent(query.text)}`);
  }
}



