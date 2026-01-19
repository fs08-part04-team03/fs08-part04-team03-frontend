import { describe, it, expect } from 'vitest';
import { cartKeys } from '../cart.keys';

describe('cartKeys', () => {
  describe('all', () => {
    it('기본 키 배열을 반환한다', () => {
      expect(cartKeys.all).toEqual(['cart']);
    });

    it('불변 배열이다 (as const)', () => {
      const key = cartKeys.all;
      expect(key).toHaveLength(1);
      expect(key[0]).toBe('cart');
    });
  });

  describe('lists', () => {
    it('리스트 키 배열을 반환한다', () => {
      expect(cartKeys.lists()).toEqual(['cart', 'list']);
    });

    it('all 키를 확장한다', () => {
      const listsKey = cartKeys.lists();
      expect(listsKey[0]).toBe(cartKeys.all[0]);
      expect(listsKey[1]).toBe('list');
    });

    it('매번 새로운 배열을 반환한다', () => {
      const first = cartKeys.lists();
      const second = cartKeys.lists();
      expect(first).not.toBe(second);
      expect(first).toEqual(second);
    });
  });

  describe('list', () => {
    it('기본 파라미터로 키를 생성한다', () => {
      const key = cartKeys.list(1, 10);
      expect(key).toEqual(['cart', 'list', 1, 10, 'all']);
    });

    it('cartItemIdsParam이 포함된 키를 생성한다', () => {
      const key = cartKeys.list(1, 10, 'item1,item2');
      expect(key).toEqual(['cart', 'list', 1, 10, 'item1,item2']);
    });

    it('cartItemIdsParam이 null인 경우 "all"을 사용한다', () => {
      const key = cartKeys.list(1, 10, null);
      expect(key).toEqual(['cart', 'list', 1, 10, 'all']);
    });

    it('cartItemIdsParam이 undefined인 경우 "all"을 사용한다', () => {
      const key = cartKeys.list(1, 10, undefined);
      expect(key).toEqual(['cart', 'list', 1, 10, 'all']);
    });

    it('cartItemIdsParam이 빈 문자열인 경우 "all"을 사용한다', () => {
      const key = cartKeys.list(1, 10, '');
      expect(key).toEqual(['cart', 'list', 1, 10, 'all']);
    });

    it('다양한 페이지와 사이즈를 지원한다', () => {
      const key1 = cartKeys.list(1, 10);
      const key2 = cartKeys.list(2, 20);
      const key3 = cartKeys.list(3, 50);

      expect(key1[2]).toBe(1);
      expect(key1[3]).toBe(10);
      expect(key2[2]).toBe(2);
      expect(key2[3]).toBe(20);
      expect(key3[2]).toBe(3);
      expect(key3[3]).toBe(50);
    });

    it('동일한 파라미터는 동일한 키를 생성한다', () => {
      const key1 = cartKeys.list(1, 10, 'items');
      const key2 = cartKeys.list(1, 10, 'items');
      expect(key1).toEqual(key2);
    });

    it('다른 페이지는 다른 키를 생성한다', () => {
      const key1 = cartKeys.list(1, 10);
      const key2 = cartKeys.list(2, 10);
      expect(key1).not.toEqual(key2);
    });

    it('다른 페이지 사이즈는 다른 키를 생성한다', () => {
      const key1 = cartKeys.list(1, 10);
      const key2 = cartKeys.list(1, 20);
      expect(key1).not.toEqual(key2);
    });

    it('다른 cartItemIdsParam은 다른 키를 생성한다', () => {
      const key1 = cartKeys.list(1, 10, 'item1');
      const key2 = cartKeys.list(1, 10, 'item2');
      expect(key1).not.toEqual(key2);
    });
  });

  describe('budget', () => {
    it('연도와 월로 키를 생성한다', () => {
      const key = cartKeys.budget(2026, 1);
      expect(key).toEqual(['budget', 2026, 1]);
    });

    it('다양한 연도와 월을 지원한다', () => {
      const jan2026 = cartKeys.budget(2026, 1);
      const dec2025 = cartKeys.budget(2025, 12);
      const jun2024 = cartKeys.budget(2024, 6);

      expect(jan2026).toEqual(['budget', 2026, 1]);
      expect(dec2025).toEqual(['budget', 2025, 12]);
      expect(jun2024).toEqual(['budget', 2024, 6]);
    });

    it('동일한 연도와 월은 동일한 키를 생성한다', () => {
      const key1 = cartKeys.budget(2026, 1);
      const key2 = cartKeys.budget(2026, 1);
      expect(key1).toEqual(key2);
    });

    it('다른 연도는 다른 키를 생성한다', () => {
      const key1 = cartKeys.budget(2026, 1);
      const key2 = cartKeys.budget(2025, 1);
      expect(key1).not.toEqual(key2);
    });

    it('다른 월은 다른 키를 생성한다', () => {
      const key1 = cartKeys.budget(2026, 1);
      const key2 = cartKeys.budget(2026, 2);
      expect(key1).not.toEqual(key2);
    });

    it('cart 키와 독립적인 구조를 가진다', () => {
      const budgetKey = cartKeys.budget(2026, 1);
      expect(budgetKey[0]).toBe('budget');
      expect(budgetKey[0]).not.toBe(cartKeys.all[0]);
    });
  });

  describe('키 계층 구조', () => {
    it('list 키는 lists 키를 확장한다', () => {
      const listsKey = cartKeys.lists();
      const listKey = cartKeys.list(1, 10);

      expect(listKey.slice(0, 2)).toEqual(listsKey);
    });

    it('lists 키는 all 키를 확장한다', () => {
      const allKey = cartKeys.all;
      const listsKey = cartKeys.lists();

      expect(listsKey[0]).toBe(allKey[0]);
    });

    it('invalidateQueries에서 계층적 무효화가 가능하다', () => {
      // all 키로 무효화하면 lists, list 모두 무효화됨을 시뮬레이션
      const allKey = cartKeys.all;
      const listsKey = cartKeys.lists();
      const listKey = cartKeys.list(1, 10);

      // list 키가 all 키로 시작하는지 확인
      expect(listKey[0]).toBe(allKey[0]);
      expect(listsKey[0]).toBe(allKey[0]);
    });
  });
});
