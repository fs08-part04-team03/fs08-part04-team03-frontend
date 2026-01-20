import { describe, it, expect } from 'vitest';
import { formatDate } from '../formatDate';

describe('formatDate', () => {
  describe('Date 객체 처리', () => {
    it('Date 객체를 YYYY.MM.DD 형식으로 변환한다', () => {
      // 로컬 타임존에 따라 결과가 다를 수 있으므로 Date 객체 직접 생성
      const localDate = new Date(2026, 0, 19); // 2026년 1월 19일
      expect(formatDate(localDate)).toBe('2026.01.19');
    });

    it('연말 날짜를 올바르게 처리한다', () => {
      const date = new Date(2026, 11, 31); // 2026년 12월 31일
      expect(formatDate(date)).toBe('2026.12.31');
    });
  });

  describe('문자열 날짜 처리', () => {
    it('ISO 형식 문자열을 변환한다', () => {
      // 로컬 타임존 고려 - 명확한 테스트를 위해 날짜 중간값 사용
      expect(formatDate('2026-06-15')).toBe('2026.06.15');
    });

    it('ISO 형식 + 시간 문자열을 변환한다', () => {
      expect(formatDate('2026-01-19T10:30:00Z')).toMatch(/2026\.01\.(18|19)/);
    });

    it('다양한 날짜 형식을 처리한다', () => {
      expect(formatDate('2026/03/15')).toBe('2026.03.15');
    });
  });

  describe('월/일 패딩', () => {
    it('한 자리 월은 0으로 패딩한다', () => {
      const date = new Date(2026, 0, 15); // 1월
      expect(formatDate(date)).toBe('2026.01.15');
    });

    it('한 자리 일은 0으로 패딩한다', () => {
      const date = new Date(2026, 5, 5); // 6월 5일
      expect(formatDate(date)).toBe('2026.06.05');
    });

    it('두 자리 월/일은 그대로 표시한다', () => {
      const date = new Date(2026, 10, 25); // 11월 25일
      expect(formatDate(date)).toBe('2026.11.25');
    });
  });

  describe('에러 처리', () => {
    it('유효하지 않은 날짜 문자열은 "-"를 반환한다', () => {
      expect(formatDate('invalid')).toBe('-');
      expect(formatDate('not-a-date')).toBe('-');
    });

    it('빈 문자열은 "-"를 반환한다', () => {
      expect(formatDate('')).toBe('-');
    });

    it('Invalid Date 객체는 "-"를 반환한다', () => {
      expect(formatDate(new Date('invalid'))).toBe('-');
    });
  });

  describe('경계값 테스트', () => {
    it('연초 첫날을 처리한다', () => {
      const date = new Date(2026, 0, 1);
      expect(formatDate(date)).toBe('2026.01.01');
    });

    it('윤년 2월 29일을 처리한다', () => {
      const date = new Date(2024, 1, 29); // 2024년은 윤년
      expect(formatDate(date)).toBe('2024.02.29');
    });
  });
});
