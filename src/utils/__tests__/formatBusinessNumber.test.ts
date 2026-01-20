import { describe, it, expect } from 'vitest';
import { formatBusinessNumber, unformatBusinessNumber } from '../formatBusinessNumber';

describe('formatBusinessNumber', () => {
  describe('기본 포맷팅', () => {
    it('10자리 숫자를 123-45-67890 형식으로 변환한다', () => {
      expect(formatBusinessNumber('1234567890')).toBe('123-45-67890');
    });

    it('이미 하이픈이 포함된 입력도 올바르게 처리한다', () => {
      expect(formatBusinessNumber('123-45-67890')).toBe('123-45-67890');
      expect(formatBusinessNumber('123-4567890')).toBe('123-45-67890');
    });
  });

  describe('부분 입력 처리', () => {
    it('1-3자리는 하이픈 없이 반환한다', () => {
      expect(formatBusinessNumber('1')).toBe('1');
      expect(formatBusinessNumber('12')).toBe('12');
      expect(formatBusinessNumber('123')).toBe('123');
    });

    it('4-5자리는 123-XX 형식으로 반환한다', () => {
      expect(formatBusinessNumber('1234')).toBe('123-4');
      expect(formatBusinessNumber('12345')).toBe('123-45');
    });

    it('6-9자리는 123-45-XXXX 형식으로 반환한다', () => {
      expect(formatBusinessNumber('123456')).toBe('123-45-6');
      expect(formatBusinessNumber('1234567')).toBe('123-45-67');
      expect(formatBusinessNumber('12345678')).toBe('123-45-678');
      expect(formatBusinessNumber('123456789')).toBe('123-45-6789');
    });
  });

  describe('입력 길이 초과 처리', () => {
    it('10자리 초과 시 그대로 포맷팅하여 유효성 검사에서 에러를 표시할 수 있게 한다', () => {
      expect(formatBusinessNumber('12345678901234')).toBe('123-45-678901234');
      expect(formatBusinessNumber('1234567890123456789')).toBe('123-45-67890123456789');
    });
  });

  describe('특수 문자 처리', () => {
    it('숫자가 아닌 문자는 제거한다', () => {
      expect(formatBusinessNumber('123-45-67890원')).toBe('123-45-67890');
      expect(formatBusinessNumber('abc1234567890')).toBe('123-45-67890');
    });

    it('공백을 제거한다', () => {
      expect(formatBusinessNumber('123 45 67890')).toBe('123-45-67890');
      expect(formatBusinessNumber(' 1234567890 ')).toBe('123-45-67890');
    });

    it('빈 문자열은 빈 문자열을 반환한다', () => {
      expect(formatBusinessNumber('')).toBe('');
    });

    it('숫자가 없는 문자열은 빈 문자열을 반환한다', () => {
      expect(formatBusinessNumber('abc')).toBe('');
      expect(formatBusinessNumber('---')).toBe('');
    });
  });

  describe('실제 사업자 번호 예시', () => {
    it('유효한 사업자 번호 형식을 처리한다', () => {
      expect(formatBusinessNumber('1018100001')).toBe('101-81-00001');
      expect(formatBusinessNumber('2208100013')).toBe('220-81-00013');
    });
  });
});

describe('unformatBusinessNumber', () => {
  describe('하이픈 제거', () => {
    it('포맷팅된 사업자 번호에서 하이픈을 제거한다', () => {
      expect(unformatBusinessNumber('123-45-67890')).toBe('1234567890');
    });

    it('부분 포맷팅된 번호도 처리한다', () => {
      expect(unformatBusinessNumber('123-45')).toBe('12345');
      expect(unformatBusinessNumber('123-45-678')).toBe('12345678');
    });
  });

  describe('숫자만 있는 입력', () => {
    it('숫자만 있는 입력은 그대로 반환한다', () => {
      expect(unformatBusinessNumber('1234567890')).toBe('1234567890');
      expect(unformatBusinessNumber('123')).toBe('123');
    });
  });

  describe('특수 문자 처리', () => {
    it('하이픈 외 다른 문자도 제거한다', () => {
      expect(unformatBusinessNumber('123-45-67890원')).toBe('1234567890');
      expect(unformatBusinessNumber('사업자번호: 123-45-67890')).toBe('1234567890');
    });

    it('빈 문자열은 빈 문자열을 반환한다', () => {
      expect(unformatBusinessNumber('')).toBe('');
    });
  });

  describe('formatBusinessNumber와의 역변환', () => {
    it('format 후 unformat하면 원본 숫자가 된다', () => {
      const original = '1234567890';
      const formatted = formatBusinessNumber(original);
      const unformatted = unformatBusinessNumber(formatted);
      expect(unformatted).toBe(original);
    });
  });
});
