'use client';

import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { tryRefreshToken } from '@/utils/api';
import { logger } from '@/utils/logger';

/**
 * 앱 초기화 시 refreshToken으로 인증 상태 복원
 * - 페이지 새로고침 시 자동 실행
 * - refreshToken(httpOnly cookie)으로 accessToken 재발급
 * - refresh API가 user 정보를 포함하므로 추가 API 호출 불필요
 *   (단, refresh API에서 user 정보를 받지 못한 경우에만 추가 처리 필요)
 */
export function useAuthInitializer() {
  const initAttempted = useRef(false);
  const setInitialized = useAuthStore((state) => state.setInitialized);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  useEffect(() => {
    // 이미 초기화되었거나 시도한 경우 스킵
    if (isInitialized || initAttempted.current) return;
    initAttempted.current = true;

    const initialize = async () => {
      try {
        // 레거시(localStorage persist) 데이터 정리
        // - 마이그레이션 이전에 저장된 auth-storage가 남아있을 수 있음
        // - 현재는 메모리 저장만 사용하므로 안전하게 제거
        if (typeof window !== 'undefined') {
          try {
            window.localStorage.removeItem('auth-storage');
          } catch {
            // localStorage 접근 불가(브라우저 정책/사파리 프라이빗 등)인 경우 무시
          }
        }

        logger.info('[AuthInitializer] 앱 초기화 시작 - refreshToken으로 인증 복원 시도');

        // refreshToken으로 accessToken + user 정보 발급
        // tryRefreshToken 내부에서 setAuth를 호출하여 store에 저장함
        const accessToken = await tryRefreshToken();

        if (accessToken) {
          logger.info('[AuthInitializer] 인증 복원 성공');
        } else {
          // accessToken이 null이면 refreshToken이 없거나 만료됨
          // 로그인이 필요한 상태로 초기화 완료
          logger.info('[AuthInitializer] refreshToken 없음/만료 - 로그인 필요');
        }
      } catch (error) {
        // 네트워크 오류 등 일시적 장애
        // 로그인 필요 상태로 초기화 완료 (강제 로그아웃하지 않음)
        logger.warn('[AuthInitializer] 인증 복원 실패:', {
          errorType: error instanceof Error ? error.constructor.name : 'Unknown',
          errorMessage: error instanceof Error ? error.message : String(error),
        });
      } finally {
        // 성공/실패와 관계없이 초기화 완료 표시
        setInitialized();
      }
    };

    // 비동기 함수 실행
    initialize().catch(() => {
      // initialize 내부에서 try/catch로 처리하지만,
      // eslint(no-void) 규칙을 피하고 예외 누수를 방지하기 위해 방어적으로 catch 처리
    });
  }, [isInitialized, setInitialized]);
}
