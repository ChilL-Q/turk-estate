import { ApiClient } from '../client';
import { LoginRequest, LoginResponse } from '../types';

export function createAuthApi(client: ApiClient) {
  return {
    login(body: LoginRequest): Promise<LoginResponse> {
      return client.post('/api/v1/auth/login', body);
    },
  };
}
