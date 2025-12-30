import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
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
}

/**
 * 클라이언트 인증 상태(Zustand) 타입
 */
interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  isHydrated: boolean;

  setAuth: (payload: { user: User | null; accessToken: string | null }) => void;
  setUser: (user: User | null) => void;
  startLoading: () => void;
  finishLoading: () => void;
  clearAuth: () => void;
  setHydrated: () => void;
}

/**
 * 클라이언트 전역 인증 상태(Zustand)
 * - localStorage에 영구 저장 (페이지 새로고침 시에도 유지)
 * - accessToken 저장
 * - refreshToken은 httpOnly 쿠키로 브라우저가 관리
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isLoading: false,
      isHydrated: false,

      setAuth: ({ user, accessToken }) => set({ user, accessToken }),
      setUser: (user) => set({ user }),

      startLoading: () => set({ isLoading: true }),
      finishLoading: () => set({ isLoading: false }),

      clearAuth: () => set({ user: null, accessToken: null }),
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: 'auth-storage', // localStorage key
      storage: createJSONStorage(() => localStorage),
      // isLoading, isHydrated은 저장하지 않음 (페이지 로드 시마다 초기화)
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          // Rehydration 실패 시에도 isHydrated를 true로 설정하여 무한 대기 방지
          const errorMessage = error instanceof Error ? error.message : 'Rehydration 실패';
          logger.error('[AuthStore] Rehydration 실패:', errorMessage);
        }
        // 성공/실패 여부와 관계없이 항상 isHydrated를 true로 설정
        state?.setHydrated();
      },
    }
  )
);
