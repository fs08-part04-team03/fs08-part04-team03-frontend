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
  isInitialized: boolean;
  clearAuth: () => void;
}

let mockStoreState: MockStoreState = {
  user: null,
  accessToken: null,
  isInitialized: false,
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
      isInitialized: false,
      clearAuth: vi.fn(),
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('초기화 전', () => {
    it('isInitialized가 false면 null을 렌더링한다', async () => {
      mockStoreState.isInitialized = false;

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

  describe('초기화 후 - 인증되지 않은 경우', () => {
    it('accessToken이 없으면 로그인 페이지로 리다이렉트한다 (초기화는 providers.tsx에서 처리)', async () => {
      mockStoreState.isInitialized = true;
      mockStoreState.accessToken = null;
      mockStoreState.user = null;

      const { AuthGuard } = await import('../AuthGuard');
      render(
        <AuthGuard companyId="company-1">
          <TestChild />
        </AuthGuard>
      );

      await waitFor(() => {
        // 마이그레이션 후: AuthGuard는 refresh를 시도하지 않고 바로 로그인으로 리다이렉트
        expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('/login?redirect='));
      });
    });

    it('user가 없으면 로그인 페이지로 리다이렉트한다', async () => {
      mockStoreState.isInitialized = true;
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

  describe('초기화 후 - 인증된 경우', () => {
    it('올바른 companyId와 권한이 있으면 children을 렌더링한다', async () => {
      mockStoreState.isInitialized = true;
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
      mockStoreState.isInitialized = true;
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
      mockStoreState.isInitialized = true;
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
      mockStoreState.isInitialized = true;
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

  describe('리렌더링 안정성', () => {
    it('리렌더링해도 정상 동작한다', async () => {
      mockStoreState.isInitialized = true;
      mockStoreState.accessToken = null;
      mockStoreState.user = null;

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

      // 마이그레이션 후: AuthGuard는 refresh를 시도하지 않고 로그인으로 리다이렉트
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalled();
      });
    });
  });

  describe('초기화 상태에 따른 렌더링', () => {
    it('초기화 상태에 따라 렌더링이 제어된다', async () => {
      mockStoreState.isInitialized = true;
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
