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

      setAuth: ({ user, accessToken }) => {
        logger.info('[AuthStore] setAuth 호출:', {
          hasUser: !!user,
          hasAccessToken: !!accessToken,
          userId: user?.id,
          userEmail: user?.email,
        });
        set({ user, accessToken });
        // set 호출 후 localStorage 확인 (비동기이므로 약간의 지연 후 확인)
        if (typeof window !== 'undefined') {
          setTimeout(() => {
            const stored = localStorage.getItem('auth-storage');
            try {
              const parsedData = stored ? (JSON.parse(stored) as unknown) : null;
              logger.info('[AuthStore] setAuth 후 localStorage 확인:', {
                hasStored: !!stored,
                storedData: parsedData,
              });
            } catch (parseError) {
              logger.error('[AuthStore] localStorage 파싱 실패:', parseError);
            }
          }, 100);
        }
      },
      setUser: (user) => set({ user }),

      startLoading: () => set({ isLoading: true }),
      finishLoading: () => set({ isLoading: false }),

      clearAuth: () => {
        set({ user: null, accessToken: null });
        // localStorage에서 완전히 제거하여 다음 로드 시 null 상태가 복원되지 않도록 함
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth-storage');
          logger.info('[AuthStore] clearAuth - localStorage 제거 완료');
        }
      },
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
      onRehydrateStorage: () => {
        // rehydration 시작 시 localStorage 확인
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('auth-storage');
          try {
            const parsedData = stored ? (JSON.parse(stored) as unknown) : null;
            logger.info('[AuthStore] Rehydration 시작 - localStorage 확인:', {
              hasStored: !!stored,
              storedData: parsedData,
            });
          } catch (parseError) {
            logger.error('[AuthStore] Rehydration 시작 시 localStorage 파싱 실패:', parseError);
          }
        }
        return (state, error) => {
          if (error) {
            // Rehydration 실패 시에도 isHydrated를 true로 설정하여 무한 대기 방지
            const errorMessage = error instanceof Error ? error.message : 'Rehydration 실패';
            logger.error('[AuthStore] Rehydration 실패:', errorMessage);
            // 에러 발생 시에도 isHydrated 설정
            if (state) {
              state.setHydrated();
            }
            return;
          }
          // 성공 시: rehydration이 완료된 직후 isHydrated를 true로 설정
          // Zustand의 persist 미들웨어는 rehydration이 완료되면 이 콜백을 호출하므로
          // 바로 setHydrated를 호출해도 안전합니다.
          if (state) {
            // user와 accessToken이 모두 null이면 localStorage에서 제거
            // (이전에 clearAuth가 제대로 동작하지 않아 저장된 경우 대비)
            if (!state.user && !state.accessToken && typeof window !== 'undefined') {
              localStorage.removeItem('auth-storage');
              logger.info('[AuthStore] Rehydration - null 상태 감지, localStorage 제거');
            }
            state.setHydrated();
            logger.info('[AuthStore] Rehydration 완료:', {
              hasUser: !!state.user,
              hasAccessToken: !!state.accessToken,
              userId: state.user?.id,
              userEmail: state.user?.email,
            });
            // rehydration 후 localStorage 재확인
            if (typeof window !== 'undefined') {
              const stored = localStorage.getItem('auth-storage');
              try {
                const parsedData = stored ? (JSON.parse(stored) as unknown) : null;
                logger.info('[AuthStore] Rehydration 후 localStorage 재확인:', {
                  hasStored: !!stored,
                  storedData: parsedData,
                });
              } catch (parseError) {
                logger.error('[AuthStore] Rehydration 후 localStorage 파싱 실패:', parseError);
              }
            }
          } else {
            logger.warn('[AuthStore] Rehydration 완료되었지만 state가 null입니다.');
          }
        };
      },
    }
  )
);
