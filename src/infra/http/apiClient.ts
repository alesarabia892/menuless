export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export class ApiError extends Error {
  status: number;
  code?: string;
  constructor(message: string, status: number, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

const DEFAULT_TIMEOUT_MS = 15000;

export class ApiClient {
  private readonly baseUrl: string;
  private readonly timeoutMs: number;
  private readonly getAuthToken?: () => Promise<string | null> | string | null;

  constructor(baseUrl?: string, timeoutMs: number = DEFAULT_TIMEOUT_MS, getAuthToken?: () => Promise<string | null> | string | null) {
    const envBase = process.env.EXPO_PUBLIC_API_BASE_URL;
    this.baseUrl = baseUrl ?? envBase ?? 'http://localhost:8000/api';
    this.timeoutMs = timeoutMs;
    this.getAuthToken = getAuthToken;
  }

  async request<T>(path: string, method: HttpMethod, body?: unknown, headers?: Record<string, string>): Promise<T> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), this.timeoutMs);
    try {
      let authHeader: Record<string, string> = {};
      // No adjuntar auth en endpoints públicos
      const lowerPath = path.toLowerCase();
      const skipAuth = lowerPath.includes('/v1/users/login') || lowerPath.includes('/v1/users/register');
      if (!skipAuth && this.getAuthToken) {
        try {
          const maybeToken = typeof this.getAuthToken === 'function' ? await (this.getAuthToken as any)() : this.getAuthToken;
          const token: string | null = typeof maybeToken === 'string' ? maybeToken : (maybeToken ?? null);
          if (token) authHeader = { Authorization: `Token ${token}` };
        } catch {
          // ignore token retrieval errors
        }
      }

      const res = await fetch(`${this.baseUrl}${path}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...authHeader,
          ...(headers ?? {}),
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      const contentType = res.headers.get('content-type') ?? '';
      const isJson = contentType.includes('application/json');
      const payload = isJson ? await res.json() : await res.text();

      if (!res.ok) {
        const message = isJson && payload && payload.message ? payload.message : res.statusText;
        const code = isJson && payload && payload.code ? payload.code : undefined;
        throw new ApiError(message || 'Request failed', res.status, code);
      }
      return payload as T;
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        throw new ApiError('Request timeout', 408, 'TIMEOUT');
      }
      if (err instanceof ApiError) throw err;
      throw new ApiError(err?.message ?? 'Network error', 0, 'NETWORK');
    } finally {
      clearTimeout(id);
    }
  }

  get<T>(path: string, headers?: Record<string, string>) {
    return this.request<T>(path, 'GET', undefined, headers);
  }
  post<T>(path: string, body?: unknown, headers?: Record<string, string>) {
    return this.request<T>(path, 'POST', body, headers);
  }
  put<T>(path: string, body?: unknown, headers?: Record<string, string>) {
    return this.request<T>(path, 'PUT', body, headers);
  }
  patch<T>(path: string, body?: unknown, headers?: Record<string, string>) {
    return this.request<T>(path, 'PATCH', body, headers);
  }
  delete<T>(path: string, headers?: Record<string, string>) {
    return this.request<T>(path, 'DELETE', undefined, headers);
  }
}


