import { ApiClient } from '../client';
import { Listing, SearchFilters } from '../types';

export function createSearchApi(client: ApiClient) {
  return {
    searchListings(filters: SearchFilters = {}): Promise<Listing[]> {
      return client.get('/api/v1/search/', filters as Record<string, string | number | boolean | undefined>);
    },
  };
}
