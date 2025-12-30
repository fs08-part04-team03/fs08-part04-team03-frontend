/**
 * 개발 환경에서만 동작하는 로거 유틸리티
 */

/**
 * 에러 로그 출력 (개발 환경에서만)
 *
 * @param message - 로그 메시지
 * @param error - 에러 객체 (선택)
 *
 * @example
 * ```typescript
 * logger.error('구매 요청 승인 실패:', approveError);
 * ```
 */
const error = (message: string, errorObj?: unknown): void => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.error(message, errorObj);
  }
};

/**
 * 경고 로그 출력 (개발 환경에서만)
 *
 * @param message - 로그 메시지
 * @param data - 추가 데이터 (선택)
 */
const warn = (message: string, data?: unknown): void => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn(message, data);
  }
};

/**
 * 정보 로그 출력 (개발 환경에서만)
 *
 * @param message - 로그 메시지
 * @param data - 추가 데이터 (선택)
 */
const info = (message: string, data?: unknown): void => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(message, data);
  }
};

export const logger = {
  error,
  warn,
  info,
};
