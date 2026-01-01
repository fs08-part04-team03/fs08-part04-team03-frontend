/**
 * 공통 메시지 상수 정의
 */

/**
 * 로딩 관련 메시지
 */
export const LOADING_MESSAGES = {
  DEFAULT: '로딩 중...',
} as const;

/**
 * 에러 관련 메시지
 */
export const ERROR_MESSAGES = {
  TIMEOUT: '요청 시간이 초과되었습니다. 다시 시도해주세요.',
  FETCH_ERROR: '데이터를 불러오는 중 오류가 발생했습니다.',
  PARSE_ERROR: '서버 응답을 파싱할 수 없습니다.',
  INVALID_RESPONSE: '서버 응답 형식이 올바르지 않습니다.',
  REQUEST_FAILED: '요청에 실패했습니다.',
  AUTH_TOKEN_MISSING: '인증 토큰이 없습니다. 로그인이 필요합니다.',
  RETRY_LATER: '잠시 후 다시 시도해주세요.',
} as const;

/**
 * 성공 메시지
 */
export const SUCCESS_MESSAGES = {
  PURCHASE_APPROVED: '구매 요청이 승인되었습니다.',
  PURCHASE_REJECTED: '구매 요청이 반려되었습니다.',
  PURCHASE_CANCELLED: '구매 요청이 취소되었습니다.',
  SIGNUP_SUCCESS: '회원가입이 완료되었습니다.',
  LOGIN_SUCCESS: '로그인되었습니다.',
} as const;

/**
 * Purchase 관련 에러 메시지
 */
export const PURCHASE_ERROR_MESSAGES = {
  APPROVE_FAILED: '구매 요청 승인이 실패했습니다. 잠시 후 다시 시도해주세요.',
  REJECT_FAILED: '구매 요청 반려가 실패했습니다. 잠시 후 다시 시도해주세요.',
  CANCEL_FAILED: '구매 요청 취소가 실패했습니다. 잠시 후 다시 시도해주세요.',
} as const;

/**
 * Auth 관련 에러 메시지
 */
export const AUTH_ERROR_MESSAGES = {
  LOGIN_FAILED: '로그인에 실패했습니다.',
  SIGNUP_FAILED: '회원가입에 실패했습니다.',
  INVALID_CREDENTIALS: '이메일 또는 비밀번호가 올바르지 않습니다.',
  INVALID_INVITE_LINK: '유효하지 않은 초대 링크입니다.',
  IMAGE_UPLOAD_FAILED: '이미지 업로드에 실패했습니다. 다시 시도해 주세요.',
} as const;

/**
 * 파일 업로드 관련 에러 메시지
 */
export const FILE_ERROR_MESSAGES = {
  SIZE_EXCEEDED: '파일 크기는 5MB를 초과할 수 없습니다.',
  INVALID_TYPE: '이미지 파일만 업로드 가능합니다.',
} as const;

/**
 * Validation 관련 메시지
 */
export const VALIDATION_MESSAGES = {
  COMPANY_ID_REQUIRED: '잘못된 접근입니다. 회사 ID가 필요합니다.',
} as const;
