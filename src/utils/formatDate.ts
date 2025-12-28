/**
 * 날짜를 한국 형식으로 포맷팅 (YYYY.MM.DD)
 * @param dateInput - 날짜 문자열 또는 Date 객체
 * @returns 포맷팅된 날짜 문자열 (YYYY.MM.DD) 또는 유효하지 않은 날짜인 경우 '-'
 */
export function formatDate(dateInput: string | Date): string {
  const dateObj = dateInput instanceof Date ? dateInput : new Date(dateInput);

  if (Number.isNaN(dateObj.getTime())) {
    return '-';
  }

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
}
