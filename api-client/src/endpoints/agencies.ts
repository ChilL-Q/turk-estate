import { ApiClient } from '../client';
import { AgencyRegistrationRequest, AgencyRegistrationResponse } from '../types';

export function createAgenciesApi(client: ApiClient) {
  return {
    register(body: AgencyRegistrationRequest): Promise<AgencyRegistrationResponse> {
      return client.post('/api/v1/agencies/register', body);
    },
  };
}
