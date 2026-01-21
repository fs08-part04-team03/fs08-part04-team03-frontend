/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

// fetch mock
const mockFetch = vi.fn();
global.fetch = mockFetch;

// logger mock
vi.mock('@/utils/logger', () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

// authStore mock
const mockSetAuth = vi.fn();
const mockClearAuth = vi.fn();

interface MockUser {
  id: string;
  email: string;
  name: string;
  role: string;
  companyId: string;
}

interface MockStoreState {
  user: MockUser | null;
  accessToken: string | null;
  setAuth: typeof mockSetAuth;
  clearAuth: typeof mockClearAuth;
}

let mockStoreState: MockStoreState = {
  user: null,
  accessToken: null,
  setAuth: mockSetAuth,
  clearAuth: mockClearAuth,
};

vi.mock('@/lib/store/authStore', () => ({
  useAuthStore: {
    getState: () => mockStoreState,
    setState: (newState: Partial<MockStoreState>) => {
      mockStoreState = { ...mockStoreState, ...newState };
    },
  },
}));

// constants mock
vi.mock('@/features/auth/utils/constants', () => ({
  DEFAULT_API_URL: 'http://localhost:3000',
  DEFAULT_TIMEOUT: 5000,
  ENV_KEYS: {
    API_URL: 'NEXT_PUBLIC_API_URL',
    API_TIMEOUT: 'NEXT_PUBLIC_API_TIMEOUT',
  },
  AUTH_API_PATHS: {
    REFRESH: '/api/v1/auth/refresh',
    LOGIN: '/api/v1/auth/login',
    LOGOUT: '/api/v1/auth/logout',
  },
}));

describe('api.ts', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mockFetch.mockReset();

    // Reset store state
    mockStoreState = {
      user: null,
      accessToken: null,
      setAuth: mockSetAuth,
      clearAuth: mockClearAuth,
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('tryRefreshToken', () => {
    it('성공 시 accessToken을 반환한다', async () => {
      const mockAccessToken = 'new-access-token';
      const mockUser = {
        id: 'user-1',
        companyId: 'company-1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'USER',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({
            success: true,
            data: {
              accessToken: mockAccessToken,
              user: mockUser,
            },
          }),
      });

      const { tryRefreshToken } = await import('../api');
      const result = await tryRefreshToken();

      expect(result).toBe(mockAccessToken);
      expect(mockSetAuth).toHaveBeenCalledWith({
        user: expect.objectContaining({
          id: 'user-1',
          email: 'test@example.com',
        }),
        accessToken: mockAccessToken,
      });
    });

    it('401 응답 시 null을 반환한다 (refresh token 만료)', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
      });

      const { tryRefreshToken } = await import('../api');
      const result = await tryRefreshToken();

      expect(result).toBeNull();
    });

    it('403 응답 시 에러를 throw한다', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
        statusText: 'Forbidden',
      });

      const { tryRefreshToken } = await import('../api');

      await expect(tryRefreshToken()).rejects.toThrow('토큰 갱신이 거부되었습니다');
    });

    it('네트워크 오류 시 예외를 전파한다', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const { tryRefreshToken } = await import('../api');

      await expect(tryRefreshToken()).rejects.toThrow('Network error');
    });

    it('타임아웃 시 에러를 throw한다', async () => {
      // AbortError를 시뮬레이션
      const abortError = new Error('Aborted');
      abortError.name = 'AbortError';
      mockFetch.mockRejectedValueOnce(abortError);

      const { tryRefreshToken } = await import('../api');

      await expect(tryRefreshToken()).rejects.toThrow('토큰 갱신 요청 시간이 초과되었습니다');
    });

    it('user 정보가 없는 응답에서도 accessToken을 반환한다', async () => {
      const mockAccessToken = 'new-access-token';
      const existingUser = {
        id: 'user-1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
        companyId: 'company-1',
      };

      // 기존 user 정보 설정
      mockStoreState.user = existingUser;

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({
            success: true,
            data: {
              accessToken: mockAccessToken,
              // user 정보 없음
            },
          }),
      });

      const { tryRefreshToken } = await import('../api');
      const result = await tryRefreshToken();

      expect(result).toBe(mockAccessToken);
      // 기존 user 정보가 유지되어야 함
      expect(mockSetAuth).toHaveBeenCalledWith({
        user: existingUser,
        accessToken: mockAccessToken,
      });
    });
  });

  describe('handle401Error', () => {
    it('토큰 갱신 성공 시 "refreshed"를 반환한다', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({
            success: true,
            data: {
              accessToken: 'new-token',
              user: {
                id: 'user-1',
                companyId: 'company-1',
                email: 'test@example.com',
                name: 'Test User',
                role: 'USER',
              },
            },
          }),
      });

      const { handle401Error } = await import('../api');
      const result = await handle401Error();

      expect(result).toBe('refreshed');
    });

    it('refresh token 만료 시 "expired"를 반환한다', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
      });

      const { handle401Error } = await import('../api');
      const result = await handle401Error();

      expect(result).toBe('expired');
    });

    it('네트워크 오류 시 "failed"를 반환한다', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const { handle401Error } = await import('../api');
      const result = await handle401Error();

      expect(result).toBe('failed');
    });
  });

  describe('fetchWithAuth', () => {
    beforeEach(() => {
      // accessToken 설정
      mockStoreState.accessToken = 'existing-token';
    });

    it('Authorization 헤더에 Bearer 토큰을 포함한다', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ data: 'test' }),
      });

      const { fetchWithAuth } = await import('../api');
      await fetchWithAuth('/api/test');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer existing-token',
          }),
        })
      );
    });

    it('credentials: include가 설정된다', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ data: 'test' }),
      });

      const { fetchWithAuth } = await import('../api');
      await fetchWithAuth('/api/test');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          credentials: 'include',
        })
      );
    });

    it('401 응답 시 토큰 갱신 후 재시도한다', async () => {
      // 첫 번째 요청: 401
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
      });

      // 토큰 갱신 요청
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({
            success: true,
            data: {
              accessToken: 'new-token',
              user: {
                id: 'user-1',
                companyId: 'company-1',
                email: 'test@example.com',
                name: 'Test User',
                role: 'USER',
              },
            },
          }),
      });

      // 새 토큰 적용을 위해 store 업데이트 시뮬레이션
      mockSetAuth.mockImplementationOnce(
        ({ accessToken }: { accessToken: string; user: MockUser | null }) => {
          mockStoreState.accessToken = accessToken;
        }
      );

      // 재시도 요청: 성공
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ data: 'success' }),
      });

      const { fetchWithAuth } = await import('../api');
      const response = await fetchWithAuth('/api/test');

      expect(response.ok).toBe(true);
      // 총 3번 호출: 원래 요청 + 토큰 갱신 + 재시도
      expect(mockFetch).toHaveBeenCalledTimes(3);
    });

    it('accessToken이 없으면 먼저 갱신을 시도한다', async () => {
      mockStoreState.accessToken = null;

      // 토큰 갱신 요청
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({
            success: true,
            data: {
              accessToken: 'new-token',
              user: {
                id: 'user-1',
                companyId: 'company-1',
                email: 'test@example.com',
                name: 'Test User',
                role: 'USER',
              },
            },
          }),
      });

      // 새 토큰 적용
      mockSetAuth.mockImplementationOnce(
        ({ accessToken }: { accessToken: string; user: MockUser | null }) => {
          mockStoreState.accessToken = accessToken;
        }
      );

      // 실제 요청
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ data: 'success' }),
      });

      const { fetchWithAuth } = await import('../api');
      const response = await fetchWithAuth('/api/test');

      expect(response.ok).toBe(true);
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it('토큰이 없고 갱신도 실패하면 에러를 throw한다', async () => {
      mockStoreState.accessToken = null;

      // 토큰 갱신 실패 (401)
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
      });

      const { fetchWithAuth } = await import('../api');

      await expect(fetchWithAuth('/api/test')).rejects.toThrow(
        '인증 토큰이 없습니다. 로그인이 필요합니다.'
      );
    });
  });

  describe('동시성 테스트', () => {
    it('여러 401 응답이 동시에 발생해도 refresh는 정상 처리된다', async () => {
      // 이 테스트는 현재 구현에서 동시성 보장이 필요한 부분을 검증
      // 마이그레이션 후 전역 락이 적용되면 더 엄격한 테스트 필요

      mockStoreState.accessToken = 'old-token';

      const mockUser = {
        id: 'user-1',
        companyId: 'company-1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'USER',
      };

      // 여러 번의 handle401Error 호출
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: () =>
            Promise.resolve({
              success: true,
              data: { accessToken: 'token-1', user: mockUser },
            }),
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: () =>
            Promise.resolve({
              success: true,
              data: { accessToken: 'token-2', user: mockUser },
            }),
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: () =>
            Promise.resolve({
              success: true,
              data: { accessToken: 'token-3', user: mockUser },
            }),
        });

      const { handle401Error } = await import('../api');

      // 동시에 3개의 handle401Error 호출
      const results = await Promise.all([handle401Error(), handle401Error(), handle401Error()]);

      // 모든 호출이 성공해야 함
      expect(results).toEqual(['refreshed', 'refreshed', 'refreshed']);
    });

    it('refresh 실패 시 무한 루프가 발생하지 않는다', async () => {
      mockStoreState.accessToken = 'old-token';

      // 계속 401 반환
      mockFetch.mockResolvedValue({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
      });

      const { handle401Error } = await import('../api');

      const result = await handle401Error();

      // expired로 처리되어야 함
      expect(result).toBe('expired');
      // refresh는 1번만 호출되어야 함
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('AuthExpiredError', () => {
    it('올바르게 생성된다', async () => {
      const { AuthExpiredError } = await import('../api');

      const error = new AuthExpiredError('Test error', 401, null, { message: 'expired' });

      expect(error.name).toBe('AuthExpiredError');
      expect(error.message).toBe('Test error');
      expect(error.status).toBe(401);
      expect(error.responseData).toEqual({ message: 'expired' });
    });
  });
});
