export * from './types';
export { ApiClient, ApiClientError } from './client';
export { createAuthApi } from './endpoints/auth';
export { createAgenciesApi } from './endpoints/agencies';
export { createSearchApi } from './endpoints/search';
export { createLocationsApi } from './endpoints/locations';

// ─── Convenience factory ──────────────────────────────────────────────────────

import { ApiClient } from './client';
import { createAuthApi } from './endpoints/auth';
import { createAgenciesApi } from './endpoints/agencies';
import { createSearchApi } from './endpoints/search';
import { createLocationsApi } from './endpoints/locations';

/**
 * Creates a fully configured TurkEstate API client.
 *
 * Usage (web):
 *   const api = createTurkEstateApi(process.env.NEXT_PUBLIC_API_URL!);
 *
 * Usage (React Native):
 *   const api = createTurkEstateApi(process.env.EXPO_PUBLIC_API_URL!);
 *
 * After login:
 *   api.client.setToken(loginResponse.access_token);
 */
export function createTurkEstateApi(baseUrl: string) {
  const client = new ApiClient(baseUrl);
  return {
    client,
    auth: createAuthApi(client),
    agencies: createAgenciesApi(client),
    search: createSearchApi(client),
    locations: createLocationsApi(client),
  };
}
