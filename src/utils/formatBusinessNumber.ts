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

  // 최대 10자리까지만 허용
  const limitedNumbers = numbers.slice(0, 10);

  // 123-45-67890 형식으로 포맷팅
  if (limitedNumbers.length <= 3) {
    return limitedNumbers;
  }
  if (limitedNumbers.length <= 5) {
    return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3)}`;
  }
  return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3, 5)}-${limitedNumbers.slice(5)}`;
};

/**
 * 사업자 번호에서 하이픈 제거
 * @param value - 포맷팅된 사업자 번호
 * @returns 숫자만 있는 사업자 번호
 */
export const unformatBusinessNumber = (value: string): string => value.replace(/[^\d]/g, '');
