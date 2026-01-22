/**
 * 개발 환경에서만 동작하는 로거 유틸리티
 * 프로덕션 빌드 시 Next.js가 dead code elimination을 통해 완전히 제거됩니다.
 */

// 빌드 시점에 결정되는 상수 (Next.js가 최적화함)
const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * 에러 로그 출력 (개발 환경에서만)
 * 프로덕션에서는 no-op 함수로 교체되어 아무것도 실행되지 않습니다.
 *
 * @param message - 로그 메시지
 * @param args - 추가 데이터 (여러 개 가능)
 *
 * @example
 * ```typescript
 * logger.error('구매 요청 승인 실패:', approveError);
 * ```
 */
const error = (message: string, ...args: unknown[]): void => {
  // 프로덕션 빌드 시 이 블록 전체가 제거됨 (dead code elimination)
  if (isDevelopment) {
    // eslint-disable-next-line no-console
    console.error(message, ...args);
  }
};

/**
 * 경고 로그 출력 (개발 환경에서만)
 * 프로덕션에서는 no-op 함수로 교체되어 아무것도 실행되지 않습니다.
 *
 * @param message - 로그 메시지
 * @param args - 추가 데이터 (여러 개 가능)
 */
const warn = (message: string, ...args: unknown[]): void => {
  // 프로덕션 빌드 시 이 블록 전체가 제거됨 (dead code elimination)
  if (isDevelopment) {
    // eslint-disable-next-line no-console
    console.warn(message, ...args);
  }
};

/**
 * 정보 로그 출력 (개발 환경에서만)
 * 프로덕션에서는 no-op 함수로 교체되어 아무것도 실행되지 않습니다.
 *
 * @param message - 로그 메시지
 * @param args - 추가 데이터 (여러 개 가능)
 */
const info = (message: string, ...args: unknown[]): void => {
  // 프로덕션 빌드 시 이 블록 전체가 제거됨 (dead code elimination)
  if (isDevelopment) {
    // eslint-disable-next-line no-console
    console.log(message, ...args);
  }
};

export const logger = {
  error,
  warn,
  info,
};
