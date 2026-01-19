import { describe, it, expect } from 'vitest';
import { wishlistKeys } from '../wishlist.keys';

describe('wishlistKeys', () => {
  describe('all', () => {
    it('companyId로 키를 생성한다', () => {
      const key = wishlistKeys.all('company-123');
      expect(key).toEqual(['wishlist', 'company-123']);
    });

    it('다양한 companyId를 지원한다', () => {
      const key1 = wishlistKeys.all('company-1');
      const key2 = wishlistKeys.all('company-2');
      const key3 = wishlistKeys.all('abc-xyz-123');

      expect(key1).toEqual(['wishlist', 'company-1']);
      expect(key2).toEqual(['wishlist', 'company-2']);
      expect(key3).toEqual(['wishlist', 'abc-xyz-123']);
    });

    it('동일한 companyId는 동일한 키를 생성한다', () => {
      const key1 = wishlistKeys.all('company-1');
      const key2 = wishlistKeys.all('company-1');
      expect(key1).toEqual(key2);
    });

    it('다른 companyId는 다른 키를 생성한다', () => {
      const key1 = wishlistKeys.all('company-1');
      const key2 = wishlistKeys.all('company-2');
      expect(key1).not.toEqual(key2);
    });

    it('불변 배열이다 (as const)', () => {
      const key = wishlistKeys.all('company-1');
      expect(key).toHaveLength(2);
      expect(key[0]).toBe('wishlist');
      expect(key[1]).toBe('company-1');
    });

    it('매번 새로운 배열을 반환한다', () => {
      const first = wishlistKeys.all('company-1');
      const second = wishlistKeys.all('company-1');
      expect(first).not.toBe(second);
      expect(first).toEqual(second);
    });

    it('테넌트 구조를 반영한다 (회사별 격리)', () => {
      // 다른 회사의 위시리스트는 완전히 다른 키
      const companyAKey = wishlistKeys.all('company-a');
      const companyBKey = wishlistKeys.all('company-b');

      // 회사별로 독립적인 캐시 키
      expect(companyAKey[1]).toBe('company-a');
      expect(companyBKey[1]).toBe('company-b');
      expect(companyAKey).not.toEqual(companyBKey);
    });
  });
});
