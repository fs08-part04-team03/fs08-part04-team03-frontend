import { create } from 'zustand';
import type { UserRole } from '@/constants/roles';
import { logger } from '@/utils/logger';

/**
 * 사용자 인증 정보 타입
 */
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  companyId: string;
  image?: string; // 프로필 이미지 키 (선택적)
}

/**
 * 클라이언트 인증 상태(Zustand) 타입
 */
interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  isInitialized: boolean; // 앱 초기화 완료 여부 (구: isHydrated)

  setAuth: (payload: { user: User | null; accessToken: string | null }) => void;
  setUser: (user: User | null) => void;
  startLoading: () => void;
  finishLoading: () => void;
  clearAuth: () => void;
  setInitialized: () => void;
}

/**
 * 클라이언트 전역 인증 상태(Zustand)
 * - 메모리에만 저장 (localStorage 사용 안 함)
 * - 페이지 새로고침 시 refreshToken(httpOnly 쿠키)으로 복원
 * - accessToken은 메모리에만 저장하여 XSS 피해 범위 축소
 * - refreshToken은 httpOnly 쿠키로 브라우저가 관리
 */
export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  accessToken: null,
  isLoading: false,
  isInitialized: false,

  setAuth: ({ user, accessToken }) => {
    logger.info('[AuthStore] setAuth 호출:', {
      hasUser: !!user,
      hasAccessToken: !!accessToken,
      userId: user?.id,
      userEmail: user?.email,
    });
    set({ user, accessToken });
  },

  setUser: (user) => set({ user }),

  startLoading: () => set({ isLoading: true }),
  finishLoading: () => set({ isLoading: false }),

  clearAuth: () => {
    logger.info('[AuthStore] clearAuth - 메모리에서 인증 정보 제거');
    set({ user: null, accessToken: null });
  },

  setInitialized: () => {
    logger.info('[AuthStore] setInitialized - 앱 초기화 완료');
    set({ isInitialized: true });
  },
}));

/**
 * @deprecated isHydrated 대신 isInitialized 사용
 * 하위 호환성을 위해 유지 (마이그레이션 완료 후 제거 예정)
 */
export const useIsHydrated = () => useAuthStore((state) => state.isInitialized);
