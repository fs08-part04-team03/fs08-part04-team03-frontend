/* eslint-disable @typescript-eslint/no-unsafe-return */
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

// logger mock
vi.mock('@/utils/logger', () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

// Next.js navigation mock
const mockPush = vi.fn();
const mockReplace = vi.fn();
let mockPathname = '/company-1/products';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => mockPathname,
}));

// tryRefreshToken mock
const mockTryRefreshToken = vi.fn();
vi.mock('@/utils/api', () => ({
  tryRefreshToken: () => mockTryRefreshToken(),
}));

// hasAccess mock
const mockHasAccess = vi.fn();
vi.mock('@/utils/auth', () => ({
  hasAccess: (role: string, pathname: string) => mockHasAccess(role, pathname),
}));

// constants mock
vi.mock('@/constants', () => ({
  PATHNAME: {
    LOGIN: '/login',
    PRODUCTS: (companyId: string) => `/${companyId}/products`,
  },
}));

// authStore mock
interface MockUser {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'manager' | 'admin';
  companyId: string;
}

interface MockStoreState {
  user: MockUser | null;
  accessToken: string | null;
  isHydrated: boolean;
  clearAuth: () => void;
}

let mockStoreState: MockStoreState = {
  user: null,
  accessToken: null,
  isHydrated: false,
  clearAuth: vi.fn(),
};

vi.mock('@/lib/store/authStore', () => ({
  useAuthStore: (selector: (state: MockStoreState) => unknown) => selector(mockStoreState),
}));

// 테스트용 컴포넌트
const TestChild = () => <div data-testid="protected-content">Protected Content</div>;

describe('AuthGuard', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    mockPathname = '/company-1/products';
    mockHasAccess.mockReturnValue(true);
    mockTryRefreshToken.mockReset();
    mockPush.mockReset();
    mockReplace.mockReset();

    // Reset store state
    mockStoreState = {
      user: null,
      accessToken: null,
      isHydrated: false,
      clearAuth: vi.fn(),
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('하이드레이션 전', () => {
    it('isHydrated가 false면 null을 렌더링한다', async () => {
      mockStoreState.isHydrated = false;

      const { AuthGuard } = await import('../AuthGuard');
      const { container } = render(
        <AuthGuard companyId="company-1">
          <TestChild />
        </AuthGuard>
      );

      expect(container.firstChild).toBeNull();
      expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    });
  });

  describe('하이드레이션 후 - 인증되지 않은 경우', () => {
    it('accessToken이 없으면 refresh를 시도한다', async () => {
      mockStoreState.isHydrated = true;
      mockStoreState.accessToken = null;
      mockStoreState.user = null;

      mockTryRefreshToken.mockResolvedValueOnce(null);

      const { AuthGuard } = await import('../AuthGuard');
      render(
        <AuthGuard companyId="company-1">
          <TestChild />
        </AuthGuard>
      );

      await waitFor(() => {
        expect(mockTryRefreshToken).toHaveBeenCalled();
      });
    });

    it('refresh 실패 시 로그인 페이지로 리다이렉트한다', async () => {
      mockStoreState.isHydrated = true;
      mockStoreState.accessToken = null;
      mockStoreState.user = null;

      mockTryRefreshToken.mockResolvedValueOnce(null);

      const { AuthGuard } = await import('../AuthGuard');
      render(
        <AuthGuard companyId="company-1">
          <TestChild />
        </AuthGuard>
      );

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('/login?redirect='));
      });
    });

    it('user가 없으면 로그인 페이지로 리다이렉트한다', async () => {
      mockStoreState.isHydrated = true;
      mockStoreState.accessToken = 'valid-token';
      mockStoreState.user = null;

      const { AuthGuard } = await import('../AuthGuard');
      render(
        <AuthGuard companyId="company-1">
          <TestChild />
        </AuthGuard>
      );

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('/login?redirect='));
      });
    });
  });

  describe('하이드레이션 후 - 인증된 경우', () => {
    it('올바른 companyId와 권한이 있으면 children을 렌더링한다', async () => {
      mockStoreState.isHydrated = true;
      mockStoreState.accessToken = 'valid-token';
      mockStoreState.user = {
        id: 'user-1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
        companyId: 'company-1',
      };

      mockHasAccess.mockReturnValue(true);

      const { AuthGuard } = await import('../AuthGuard');
      render(
        <AuthGuard companyId="company-1">
          <TestChild />
        </AuthGuard>
      );

      expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    });

    it('다른 companyId면 올바른 회사 페이지로 리다이렉트한다', async () => {
      mockStoreState.isHydrated = true;
      mockStoreState.accessToken = 'valid-token';
      mockStoreState.user = {
        id: 'user-1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
        companyId: 'company-2', // 다른 companyId
      };

      const { AuthGuard } = await import('../AuthGuard');
      render(
        <AuthGuard companyId="company-1">
          <TestChild />
        </AuthGuard>
      );

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/company-2/products');
      });
    });

    it('권한이 없으면 products 페이지로 리다이렉트한다', async () => {
      mockStoreState.isHydrated = true;
      mockStoreState.accessToken = 'valid-token';
      mockStoreState.user = {
        id: 'user-1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
        companyId: 'company-1',
      };

      mockHasAccess.mockReturnValue(false); // 권한 없음

      const { AuthGuard } = await import('../AuthGuard');
      render(
        <AuthGuard companyId="company-1">
          <TestChild />
        </AuthGuard>
      );

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/company-1/products');
      });
    });
  });

  describe('redirect 파라미터', () => {
    it('로그인 리다이렉트 시 현재 경로를 redirect 파라미터로 포함한다', async () => {
      mockPathname = '/company-1/admin/users';
      mockStoreState.isHydrated = true;
      mockStoreState.accessToken = null;
      mockStoreState.user = null;

      mockTryRefreshToken.mockResolvedValueOnce(null);

      const { AuthGuard } = await import('../AuthGuard');
      render(
        <AuthGuard companyId="company-1">
          <TestChild />
        </AuthGuard>
      );

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith(
          `/login?redirect=${encodeURIComponent('/company-1/admin/users')}`
        );
      });
    });
  });

  describe('토큰 갱신 중복 방지', () => {
    it('refresh 시도는 한 번만 수행된다', async () => {
      mockStoreState.isHydrated = true;
      mockStoreState.accessToken = null;
      mockStoreState.user = null;

      mockTryRefreshToken.mockResolvedValue(null);

      const { AuthGuard } = await import('../AuthGuard');
      const { rerender } = render(
        <AuthGuard companyId="company-1">
          <TestChild />
        </AuthGuard>
      );

      // 리렌더링
      rerender(
        <AuthGuard companyId="company-1">
          <TestChild />
        </AuthGuard>
      );

      rerender(
        <AuthGuard companyId="company-1">
          <TestChild />
        </AuthGuard>
      );

      await waitFor(() => {
        // refreshAttemptedRef로 인해 한 번만 호출
        expect(mockTryRefreshToken).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('마이그레이션 후 동작 (isInitialized)', () => {
    // 마이그레이션 후 isHydrated → isInitialized로 변경됨
    // providers.tsx에서 이미 초기화를 담당하므로 AuthGuard는 단순화될 예정
    it('초기화 상태에 따라 렌더링이 제어된다', async () => {
      // 현재: isHydrated 사용
      // 마이그레이션 후: isInitialized 사용, 초기화 로직은 providers.tsx로 이동
      mockStoreState.isHydrated = true;
      mockStoreState.accessToken = 'token';
      mockStoreState.user = {
        id: 'user-1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
        companyId: 'company-1',
      };

      mockHasAccess.mockReturnValue(true);

      const { AuthGuard } = await import('../AuthGuard');
      render(
        <AuthGuard companyId="company-1">
          <TestChild />
        </AuthGuard>
      );

      expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    });
  });
});
