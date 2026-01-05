/**
 * 가격 포맷팅 - 숫자를 콤마로 구분된 문자열로 변환
 * @param value - 포맷팅할 문자열 (숫자만 포함)
 * @returns 콤마로 구분된 문자열
 */
export const formatPrice = (value: string): string => {
  const numeric = value.replace(/[^0-9]/g, '');
  return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * 가격 유효성 검증 - 빈 값이거나 0인지 확인
 * @param price - 검증할 가격 문자열 (콤마 포함 가능)
 * @returns 유효하지 않으면 true, 유효하면 false
 */
export const isInvalidPrice = (price: string): boolean => {
  const numericPrice = price.replace(/[^0-9]/g, '');
  return !numericPrice || Number(numericPrice) === 0;
};

/**
 * URL 유효성 검증 - http:// 또는 https://로 시작하는지 확인
 * @param url - 검증할 URL 문자열
 * @returns 유효하면 true, 유효하지 않으면 false
 */
export const isValidUrl = (url: string): boolean => {
  const urlRegex = /^https?:\/\/.+/;
  return urlRegex.test(url);
};

/**
 * 가격 입력 제한 - 최대 7자리, 9,999,999까지만 허용
 * @param input - 입력된 문자열
 * @returns 유효한 입력이면 true, 아니면 false
 */
export const isValidPriceInput = (input: string): boolean => {
  const numeric = input.replace(/[^0-9]/g, '');
  return numeric === '' || (numeric.length <= 7 && Number(numeric) <= 9999999);
};
