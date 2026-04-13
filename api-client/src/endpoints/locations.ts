import { ApiClient } from '../client';
import { ApiListResponse, City, District, Neighborhood } from '../types';

export function createLocationsApi(client: ApiClient) {
  return {
    getCities(): Promise<ApiListResponse<City>> {
      return client.get('/api/v1/locations/cities');
    },

    getDistricts(cityId: number): Promise<ApiListResponse<District>> {
      return client.get(`/api/v1/locations/cities/${cityId}/districts`);
    },

    getNeighborhoods(districtId: number): Promise<ApiListResponse<Neighborhood>> {
      return client.get(`/api/v1/locations/districts/${districtId}/neighborhoods`);
    },
  };
}
