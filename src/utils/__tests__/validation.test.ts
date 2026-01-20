import { describe, it, expect } from 'vitest';
import { formatPrice, isInvalidPrice, isValidUrl, isValidPriceInput } from '../validation';

describe('formatPrice', () => {
  describe('기본 동작', () => {
    it('숫자를 콤마로 구분된 문자열로 변환한다', () => {
      expect(formatPrice('1000')).toBe('1,000');
      expect(formatPrice('1000000')).toBe('1,000,000');
      expect(formatPrice('9999999')).toBe('9,999,999');
    });

    it('3자리 미만은 콤마 없이 반환한다', () => {
      expect(formatPrice('1')).toBe('1');
      expect(formatPrice('99')).toBe('99');
      expect(formatPrice('100')).toBe('100');
      expect(formatPrice('999')).toBe('999');
    });

    it('빈 문자열은 빈 문자열을 반환한다', () => {
      expect(formatPrice('')).toBe('');
    });
  });

  describe('특수 문자 처리', () => {
    it('숫자가 아닌 문자는 제거한다', () => {
      expect(formatPrice('1,000원')).toBe('1,000');
      expect(formatPrice('abc123')).toBe('123');
      expect(formatPrice('$1,234.56')).toBe('123,456');
    });

    it('공백이 포함된 입력을 처리한다', () => {
      expect(formatPrice('1 000')).toBe('1,000');
      expect(formatPrice(' 1234 ')).toBe('1,234');
    });

    it('이미 콤마가 있는 입력을 처리한다', () => {
      expect(formatPrice('1,000,000')).toBe('1,000,000');
    });
  });
});

describe('isInvalidPrice', () => {
  describe('무효한 가격', () => {
    it('빈 값이면 true를 반환한다', () => {
      expect(isInvalidPrice('')).toBe(true);
    });

    it('0이면 true를 반환한다', () => {
      expect(isInvalidPrice('0')).toBe(true);
      expect(isInvalidPrice('00')).toBe(true);
      expect(isInvalidPrice('000')).toBe(true);
    });

    it('콤마가 포함된 0도 true를 반환한다', () => {
      expect(isInvalidPrice('0,000')).toBe(true);
    });

    it('숫자가 아닌 문자만 있으면 true를 반환한다', () => {
      expect(isInvalidPrice('abc')).toBe(true);
      expect(isInvalidPrice('원')).toBe(true);
    });
  });

  describe('유효한 가격', () => {
    it('0보다 큰 숫자면 false를 반환한다', () => {
      expect(isInvalidPrice('1')).toBe(false);
      expect(isInvalidPrice('100')).toBe(false);
      expect(isInvalidPrice('1000')).toBe(false);
    });

    it('콤마가 포함된 유효한 가격도 false를 반환한다', () => {
      expect(isInvalidPrice('1,000')).toBe(false);
      expect(isInvalidPrice('1,000,000')).toBe(false);
    });
  });
});

describe('isValidUrl', () => {
  describe('유효한 URL', () => {
    it('http://로 시작하면 true를 반환한다', () => {
      expect(isValidUrl('http://example.com')).toBe(true);
      expect(isValidUrl('http://www.example.com')).toBe(true);
      expect(isValidUrl('http://example.com/path')).toBe(true);
    });

    it('https://로 시작하면 true를 반환한다', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('https://www.example.com')).toBe(true);
      expect(isValidUrl('https://example.com/path?query=1')).toBe(true);
    });
  });

  describe('무효한 URL', () => {
    it('프로토콜이 없으면 false를 반환한다', () => {
      expect(isValidUrl('example.com')).toBe(false);
      expect(isValidUrl('www.example.com')).toBe(false);
    });

    it('다른 프로토콜이면 false를 반환한다', () => {
      expect(isValidUrl('ftp://example.com')).toBe(false);
      expect(isValidUrl('file://example.com')).toBe(false);
      expect(isValidUrl('mailto:test@example.com')).toBe(false);
    });

    it('빈 문자열은 false를 반환한다', () => {
      expect(isValidUrl('')).toBe(false);
    });

    it('프로토콜만 있고 주소가 없으면 false를 반환한다', () => {
      expect(isValidUrl('http://')).toBe(false);
      expect(isValidUrl('https://')).toBe(false);
    });
  });
});

describe('isValidPriceInput', () => {
  describe('유효한 입력', () => {
    it('빈 문자열은 true를 반환한다 (입력 중)', () => {
      expect(isValidPriceInput('')).toBe(true);
    });

    it('7자리 이하 숫자는 true를 반환한다', () => {
      expect(isValidPriceInput('1')).toBe(true);
      expect(isValidPriceInput('123')).toBe(true);
      expect(isValidPriceInput('1234567')).toBe(true);
    });

    it('최대값 9,999,999까지 true를 반환한다', () => {
      expect(isValidPriceInput('9999999')).toBe(true);
    });

    it('콤마가 포함된 입력도 처리한다', () => {
      expect(isValidPriceInput('1,000')).toBe(true);
      expect(isValidPriceInput('9,999,999')).toBe(true);
    });
  });

  describe('무효한 입력', () => {
    it('8자리 이상은 false를 반환한다', () => {
      expect(isValidPriceInput('12345678')).toBe(false);
      expect(isValidPriceInput('123456789')).toBe(false);
    });

    it('9,999,999 초과는 false를 반환한다', () => {
      expect(isValidPriceInput('10000000')).toBe(false);
      expect(isValidPriceInput('99999999')).toBe(false);
    });
  });
});
