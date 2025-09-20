import { ApiClient } from '../../infra/http/apiClient';
import { HttpSearchRepository } from '../../infra/repositories/http/HttpSearchRepository';
import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { HttpAuthRepository } from '../../infra/repositories/http/HttpAuthRepository';

export function makeApiClient() {
  return new ApiClient(undefined, undefined, async () => {
    try {
      const { HttpAuthRepository } = await import('../../infra/repositories/http/HttpAuthRepository');
      // local instance to just read token from storage without causing cycles
      const token = await new HttpAuthRepository(new ApiClient()).getToken();
      return token;
    } catch {
      return null;
    }
  });
}

export function makeSearchRepository() {
  return new HttpSearchRepository(makeApiClient());
}

export function makeAuthRepository(): AuthRepository {
  return new HttpAuthRepository(makeApiClient());
}


