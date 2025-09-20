export type User = {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
};

export interface AuthRepository {
  login(email: string, password: string): Promise<string>; // retorna token
  logout(): Promise<void>;
  getToken(): Promise<string | null>;
  me(): Promise<User>;
}
