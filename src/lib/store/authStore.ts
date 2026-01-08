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
  image?: string; // 프로필 이미지 키 (선택적)
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
        });

        // 먼저 state 업데이트
        set({ user, accessToken });

        // Zustand persist는 비동기적으로 localStorage에 저장하므로,
        // fallback으로 직접 localStorage에 저장하여 즉시 보장
        if (typeof window !== 'undefined') {
          try {
            // localStorage 사용 가능 여부 확인
            const testKey = '__localStorage_test__';
            localStorage.setItem(testKey, 'test');
            localStorage.removeItem(testKey);

            // Zustand persist 형식에 맞게 직접 저장 (fallback)
            const dataToStore = {
              state: {
                user,
                accessToken,
              },
              version: 0,
            };
            localStorage.setItem('auth-storage', JSON.stringify(dataToStore));
            logger.info('[AuthStore] setAuth - localStorage 직접 저장 완료');
          } catch (storageError) {
            // localStorage 사용 불가능 (예: 사생활 보호 모드, 쿠키 비활성화 등)
            const errorMessage =
              storageError instanceof Error ? storageError.message : String(storageError);
            logger.error('[AuthStore] localStorage 직접 저장 실패:', {
              errorMessage,
              errorType: storageError instanceof DOMException ? storageError.name : 'Unknown',
              // localStorage 사용 불가능 시 브라우저 세션 동안만 상태 유지
            });
          }

          // 저장 확인을 위한 지연 검증
          setTimeout(() => {
            try {
              const stored = localStorage.getItem('auth-storage');
              if (stored) {
                const parsedData = JSON.parse(stored) as {
                  state?: { user?: unknown; accessToken?: string };
                };
                logger.info('[AuthStore] setAuth 후 localStorage 확인:', {
                  hasStored: !!stored,
                  hasUser: !!parsedData?.state?.user,
                  hasAccessToken: !!parsedData?.state?.accessToken,
                });
              } else {
                logger.warn(
                  '[AuthStore] setAuth 후 localStorage 확인 실패 - 데이터가 저장되지 않았습니다'
                );
              }
            } catch (parseError) {
              logger.error('[AuthStore] localStorage 파싱 실패:', parseError);
            }
          }, 200);
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
      version: 0, // 버전 관리 (스키마 변경 시 증가)
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
          if (state) {
            if (typeof window !== 'undefined') {
              const stored = localStorage.getItem('auth-storage');
              try {
                const parsedData = stored
                  ? (JSON.parse(stored) as { state?: { user?: unknown; accessToken?: string } })
                  : null;
                logger.info('[AuthStore] Rehydration 후 localStorage 재확인:', {
                  hasStored: !!stored,
                  hasUserInStorage: !!parsedData?.state?.user,
                  hasAccessTokenInStorage: !!parsedData?.state?.accessToken,
                });

                // localStorage에 데이터가 있지만 state에 반영되지 않은 경우 (rehydration 실패)
                if (parsedData?.state?.user && !state.user) {
                  logger.warn(
                    '[AuthStore] localStorage에 데이터가 있지만 state에 반영되지 않음, 수동 복원 시도'
                  );
                  // 수동으로 state 복원
                  state.setAuth({
                    user: parsedData.state.user as User,
                    accessToken: parsedData.state.accessToken || null,
                  });
                  logger.info('[AuthStore] 수동 복원 완료');
                }
              } catch (parseError) {
                logger.error('[AuthStore] Rehydration 후 localStorage 파싱 실패:', parseError);
              }
            }

            state.setHydrated();
            logger.info('[AuthStore] Rehydration 완료:', {
              hasUser: !!state.user,
              hasAccessToken: !!state.accessToken,
            });
          } else {
            logger.warn('[AuthStore] Rehydration 완료되었지만 state가 null입니다.');

            // state가 null인 경우에도 localStorage에서 직접 복원 시도
            if (typeof window !== 'undefined') {
              const stored = localStorage.getItem('auth-storage');
              if (stored) {
                try {
                  const parsedData = JSON.parse(stored) as {
                    state?: { user?: unknown; accessToken?: string };
                  };
                  if (parsedData?.state?.user) {
                    logger.info(
                      '[AuthStore] state가 null이지만 localStorage에서 데이터 발견, 다음 렌더링에서 복원될 것입니다.'
                    );
                  }
                } catch {
                  // 파싱 실패는 무시
                }
              }
            }
          }
        };
      },
    }
  )
);
