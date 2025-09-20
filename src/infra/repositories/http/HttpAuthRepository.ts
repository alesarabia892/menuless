import { AuthRepository, User } from '../../../domain/repositories/AuthRepository';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiClient } from '../../../infra/http/apiClient';

const TOKEN_KEY = 'auth_token';

type LoginResponse = { token: string };

export class HttpAuthRepository implements AuthRepository {
  private readonly client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async login(email: string, password: string): Promise<string> {
    const emailOrUsername = (email ?? '').trim();
    const pwd = (password ?? '').trim();
    const body: { email?: string; username?: string; password: string } = { password: pwd };
    if (emailOrUsername && emailOrUsername.includes('@')) {
      body.email = emailOrUsername.toLowerCase();
    } else if (emailOrUsername) {
      body.username = emailOrUsername;
    }

    const { token } = await this.client.post<LoginResponse>('/v1/users/login/', body);
    await AsyncStorage.setItem(TOKEN_KEY, token);
    return token;
  }

  async logout(): Promise<void> {
    const stored = await AsyncStorage.getItem(TOKEN_KEY);
    if (stored) {
      try {
        await this.client.post<void>('/v1/users/logout/', undefined, {
          Authorization: `Token ${stored}`,
        });
      } catch {
        // ignore network errors on logout
      }
    }
    await AsyncStorage.removeItem(TOKEN_KEY);
  }

  async getToken(): Promise<string | null> {
    return AsyncStorage.getItem(TOKEN_KEY);
  }

  async me(): Promise<User> {
    return this.client.get<User>('/v1/users/me/');
  }
}
