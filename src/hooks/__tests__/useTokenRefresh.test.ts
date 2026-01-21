/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/await-thenable */
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

// logger mock
vi.mock('@/utils/logger', () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

// tryRefreshToken mock
const mockTryRefreshToken = vi.fn();
vi.mock('@/utils/api', () => ({
  tryRefreshToken: () => mockTryRefreshToken(),
}));

// authStore mock
interface MockUser {
  id: string;
  email: string;
  name: string;
  role: string;
  companyId: string;
}

let mockStoreState = {
  user: null as MockUser | null,
  accessToken: null as string | null,
  isInitialized: false,
};

vi.mock('@/lib/store/authStore', () => ({
  useAuthStore: <T>(selector: (state: typeof mockStoreState) => T): T => selector(mockStoreState),
}));

describe('useTokenRefresh', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.useFakeTimers();

    // Reset store state
    mockStoreState = {
      user: null,
      accessToken: null,
      isInitialized: false,
    };

    mockTryRefreshToken.mockReset();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  describe('초기화 전', () => {
    it('isInitialized가 false면 아무 동작도 하지 않는다', async () => {
      mockStoreState.isInitialized = false;

      const { useTokenRefresh } = await import('../useTokenRefresh');
      renderHook(() => useTokenRefresh());

      // 타이머 진행
      await act(() => {
        vi.advanceTimersByTime(5 * 60 * 1000);
      });

      expect(mockTryRefreshToken).not.toHaveBeenCalled();
    });
  });

  describe('초기화 후 - user와 accessToken이 없는 경우', () => {
    it('user도 accessToken도 없으면 refresh를 시도하지 않는다', async () => {
      mockStoreState.isInitialized = true;
      mockStoreState.user = null;
      mockStoreState.accessToken = null;

      const { useTokenRefresh } = await import('../useTokenRefresh');
      renderHook(() => useTokenRefresh());

      await act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(mockTryRefreshToken).not.toHaveBeenCalled();
    });
  });

  describe('초기화 후 - user는 있지만 accessToken이 없는 경우', () => {
    it('accessToken이 없으면 주기적 refresh를 시도하지 않는다 (초기화는 useAuthInitializer가 담당)', async () => {
      mockStoreState.isInitialized = true;
      mockStoreState.user = {
        id: 'user-1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
        companyId: 'company-1',
      };
      mockStoreState.accessToken = null;

      const { useTokenRefresh } = await import('../useTokenRefresh');
      renderHook(() => useTokenRefresh());

      await act(() => vi.advanceTimersByTimeAsync(100));

      // 마이그레이션 후: accessToken이 없으면 주기적 갱신 중단
      // 초기화는 useAuthInitializer에서 처리됨
      expect(mockTryRefreshToken).not.toHaveBeenCalled();
    });
  });

  describe('주기적 토큰 갱신', () => {
    it('user와 accessToken이 있으면 즉시 refresh를 실행한다', async () => {
      mockStoreState.isInitialized = true;
      mockStoreState.user = {
        id: 'user-1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
        companyId: 'company-1',
      };
      mockStoreState.accessToken = 'existing-token';

      mockTryRefreshToken.mockResolvedValue('new-token');

      const { useTokenRefresh } = await import('../useTokenRefresh');
      renderHook(() => useTokenRefresh());

      await act(() => vi.advanceTimersByTimeAsync(100));

      expect(mockTryRefreshToken).toHaveBeenCalledTimes(1);
    });

    it('refreshInterval마다 refresh를 실행한다', async () => {
      mockStoreState.isInitialized = true;
      mockStoreState.user = {
        id: 'user-1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
        companyId: 'company-1',
      };
      mockStoreState.accessToken = 'existing-token';

      mockTryRefreshToken.mockResolvedValue('new-token');

      const refreshInterval = 4 * 60 * 1000; // 4분
      const { useTokenRefresh } = await import('../useTokenRefresh');
      renderHook(() => useTokenRefresh(refreshInterval));

      // 초기 호출
      await act(() => vi.advanceTimersByTimeAsync(100));
      expect(mockTryRefreshToken).toHaveBeenCalledTimes(1);

      // 4분 후
      await act(() => vi.advanceTimersByTimeAsync(refreshInterval));
      expect(mockTryRefreshToken).toHaveBeenCalledTimes(2);

      // 8분 후
      await act(() => vi.advanceTimersByTimeAsync(refreshInterval));
      expect(mockTryRefreshToken).toHaveBeenCalledTimes(3);
    });

    it('언마운트 시 interval이 정리된다', async () => {
      mockStoreState.isInitialized = true;
      mockStoreState.user = {
        id: 'user-1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
        companyId: 'company-1',
      };
      mockStoreState.accessToken = 'existing-token';

      mockTryRefreshToken.mockResolvedValue('new-token');

      const refreshInterval = 4 * 60 * 1000;
      const { useTokenRefresh } = await import('../useTokenRefresh');
      const { unmount } = renderHook(() => useTokenRefresh(refreshInterval));

      // 초기 호출
      await act(() => vi.advanceTimersByTimeAsync(100));
      expect(mockTryRefreshToken).toHaveBeenCalledTimes(1);

      // 언마운트
      unmount();

      // 언마운트 후 interval이 실행되어도 호출되지 않아야 함
      await act(() => vi.advanceTimersByTimeAsync(refreshInterval * 2));
      expect(mockTryRefreshToken).toHaveBeenCalledTimes(1);
    });
  });

  describe('중복 호출 방지', () => {
    it('동시에 여러 refresh가 진행되지 않는다', async () => {
      mockStoreState.isInitialized = true;
      mockStoreState.user = {
        id: 'user-1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
        companyId: 'company-1',
      };
      mockStoreState.accessToken = 'existing-token';

      // 느린 응답 시뮬레이션
      let resolveFirst!: (value: string | PromiseLike<string>) => void;
      mockTryRefreshToken.mockImplementation(
        () =>
          new Promise<string>((resolve) => {
            resolveFirst = resolve;
          })
      );

      const { useTokenRefresh } = await import('../useTokenRefresh');
      renderHook(() => useTokenRefresh(100)); // 짧은 interval

      // 첫 번째 호출 시작
      await act(() => vi.advanceTimersByTimeAsync(50));

      expect(mockTryRefreshToken).toHaveBeenCalledTimes(1);

      // interval이 지나도 첫 번째가 진행 중이면 새 호출 안 함
      await act(() => vi.advanceTimersByTimeAsync(100));

      // inFlightRef로 인해 중복 호출 방지
      // 현재 구현에서는 interval 콜백이 실행되지만 inFlightRef.current가 true면 즉시 반환
      expect(mockTryRefreshToken).toHaveBeenCalledTimes(1);

      // 첫 번째 완료
      resolveFirst('new-token');
    });
  });

  describe('초기화 상태에 따른 동작', () => {
    it('초기화 상태에 따라 동작이 제어된다', async () => {
      mockStoreState.isInitialized = true;
      mockStoreState.user = {
        id: 'user-1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
        companyId: 'company-1',
      };
      mockStoreState.accessToken = 'token';

      mockTryRefreshToken.mockResolvedValue('new-token');

      const { useTokenRefresh } = await import('../useTokenRefresh');
      renderHook(() => useTokenRefresh());

      await act(() => vi.advanceTimersByTimeAsync(100));

      expect(mockTryRefreshToken).toHaveBeenCalled();
    });
  });
});
