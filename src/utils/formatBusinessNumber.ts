/**
 * 사업자 번호 자동 포맷팅 유틸리티
 * 123-45-67890 형식으로 변환
 */

/**
 * 사업자 번호를 123-45-67890 형식으로 포맷팅
 * @param value - 입력된 사업자 번호 (숫자만 또는 하이픈 포함)
 * @returns 포맷팅된 사업자 번호
 */
export const formatBusinessNumber = (value: string): string => {
  // 숫자만 추출
  const numbers = value.replace(/[^\d]/g, '');

  // 123-45-67890 형식으로 포맷팅 (10자리 초과 시에도 포맷팅하여 유효성 검사에서 에러 표시)
  if (numbers.length <= 3) {
    return numbers;
  }
  if (numbers.length <= 5) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  }
  // 10자리 초과해도 그대로 표시 (유효성 검사에서 에러 처리)
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5)}`;
};

/**
 * 사업자 번호에서 하이픈 제거
 * @param value - 포맷팅된 사업자 번호
 * @returns 숫자만 있는 사업자 번호
 */
export const unformatBusinessNumber = (value: string): string => value.replace(/[^\d]/g, '');
