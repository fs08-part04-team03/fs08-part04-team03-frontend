import { describe, it, expect } from 'vitest';
import { productKeys } from '../product.keys';

describe('productKeys', () => {
  describe('all', () => {
    it('기본 키 배열을 반환한다', () => {
      expect(productKeys.all).toEqual(['products']);
    });

    it('불변 배열이다 (as const)', () => {
      const key = productKeys.all;
      expect(key).toHaveLength(1);
      expect(key[0]).toBe('products');
    });
  });

  describe('lists', () => {
    it('리스트 키 배열을 반환한다', () => {
      expect(productKeys.lists()).toEqual(['products', 'list']);
    });

    it('all 키를 확장한다', () => {
      const listsKey = productKeys.lists();
      expect(listsKey[0]).toBe(productKeys.all[0]);
      expect(listsKey[1]).toBe('list');
    });

    it('매번 새로운 배열을 반환한다', () => {
      const first = productKeys.lists();
      const second = productKeys.lists();
      expect(first).not.toBe(second);
      expect(first).toEqual(second);
    });
  });

  describe('list', () => {
    it('모든 파라미터가 포함된 키를 반환한다', () => {
      const key = productKeys.list(1, 'latest', 'search', true);
      expect(key).toEqual(['products', 'list', 1, 'latest', 'search', true]);
    });

    it('categoryId가 null인 경우', () => {
      const key = productKeys.list(null, 'latest', '', false);
      expect(key).toEqual(['products', 'list', null, 'latest', '', false]);
    });

    it('다양한 sort 옵션을 지원한다', () => {
      const latestKey = productKeys.list(null, 'latest', '', true);
      const priceKey = productKeys.list(null, 'lowprice', '', true);
      const highPriceKey = productKeys.list(null, 'highprice', '', true);

      expect(latestKey[3]).toBe('latest');
      expect(priceKey[3]).toBe('lowprice');
      expect(highPriceKey[3]).toBe('highprice');
    });

    it('검색어를 포함한다', () => {
      const key = productKeys.list(null, 'latest', '음료', true);
      expect(key[4]).toBe('음료');
    });

    it('인증 상태에 따라 다른 키를 생성한다', () => {
      const authenticatedKey = productKeys.list(1, 'latest', '', true);
      const unauthenticatedKey = productKeys.list(1, 'latest', '', false);

      expect(authenticatedKey[5]).toBe(true);
      expect(unauthenticatedKey[5]).toBe(false);
      expect(authenticatedKey).not.toEqual(unauthenticatedKey);
    });

    it('동일한 파라미터는 동일한 키를 생성한다', () => {
      const key1 = productKeys.list(1, 'latest', 'test', true);
      const key2 = productKeys.list(1, 'latest', 'test', true);
      expect(key1).toEqual(key2);
    });

    it('다른 파라미터는 다른 키를 생성한다', () => {
      const key1 = productKeys.list(1, 'latest', '', true);
      const key2 = productKeys.list(2, 'latest', '', true);
      expect(key1).not.toEqual(key2);
    });
  });

  describe('detail', () => {
    it('문자열 productId로 키를 생성한다', () => {
      const key = productKeys.detail('abc-123');
      expect(key).toEqual(['product', 'abc-123']);
    });

    it('숫자 productId로 키를 생성한다', () => {
      const key = productKeys.detail(123);
      expect(key).toEqual(['product', 123]);
    });

    it('동일한 productId는 동일한 키를 생성한다', () => {
      const key1 = productKeys.detail('product-1');
      const key2 = productKeys.detail('product-1');
      expect(key1).toEqual(key2);
    });

    it('다른 productId는 다른 키를 생성한다', () => {
      const key1 = productKeys.detail('product-1');
      const key2 = productKeys.detail('product-2');
      expect(key1).not.toEqual(key2);
    });
  });

  describe('myDetail', () => {
    it('문자열 productId로 키를 생성한다', () => {
      const key = productKeys.myDetail('abc-123');
      expect(key).toEqual(['myProduct', 'abc-123']);
    });

    it('숫자 productId로 키를 생성한다', () => {
      const key = productKeys.myDetail(123);
      expect(key).toEqual(['myProduct', 123]);
    });

    it('detail과 다른 키를 생성한다', () => {
      const detailKey = productKeys.detail('product-1');
      const myDetailKey = productKeys.myDetail('product-1');
      expect(detailKey).not.toEqual(myDetailKey);
      expect(detailKey[0]).toBe('product');
      expect(myDetailKey[0]).toBe('myProduct');
    });
  });

  describe('myRegistered', () => {
    it('페이지네이션 파라미터로 키를 생성한다', () => {
      const key = productKeys.myRegistered(1, 10, 'latest');
      expect(key).toEqual(['myRegisteredProducts', 1, 10, 'latest']);
    });

    it('다양한 페이지와 사이즈를 지원한다', () => {
      const key1 = productKeys.myRegistered(1, 10, 'latest');
      const key2 = productKeys.myRegistered(2, 20, 'lowprice');

      expect(key1).toEqual(['myRegisteredProducts', 1, 10, 'latest']);
      expect(key2).toEqual(['myRegisteredProducts', 2, 20, 'lowprice']);
    });

    it('동일한 파라미터는 동일한 키를 생성한다', () => {
      const key1 = productKeys.myRegistered(1, 10, 'latest');
      const key2 = productKeys.myRegistered(1, 10, 'latest');
      expect(key1).toEqual(key2);
    });

    it('다른 페이지는 다른 키를 생성한다', () => {
      const key1 = productKeys.myRegistered(1, 10, 'latest');
      const key2 = productKeys.myRegistered(2, 10, 'latest');
      expect(key1).not.toEqual(key2);
    });

    it('다른 사이즈는 다른 키를 생성한다', () => {
      const key1 = productKeys.myRegistered(1, 10, 'latest');
      const key2 = productKeys.myRegistered(1, 20, 'latest');
      expect(key1).not.toEqual(key2);
    });

    it('다른 정렬은 다른 키를 생성한다', () => {
      const key1 = productKeys.myRegistered(1, 10, 'latest');
      const key2 = productKeys.myRegistered(1, 10, 'highprice');
      expect(key1).not.toEqual(key2);
    });
  });

  describe('키 계층 구조', () => {
    it('list 키는 lists 키를 확장한다', () => {
      const listsKey = productKeys.lists();
      const listKey = productKeys.list(1, 'latest', '', true);

      expect(listKey.slice(0, 2)).toEqual(listsKey);
    });

    it('lists 키는 all 키를 확장한다', () => {
      const allKey = productKeys.all;
      const listsKey = productKeys.lists();

      expect(listsKey[0]).toBe(allKey[0]);
    });

    it('detail 키는 독립적인 구조를 가진다', () => {
      const detailKey = productKeys.detail('1');
      expect(detailKey[0]).toBe('product');
      expect(detailKey[0]).not.toBe(productKeys.all[0]);
    });
  });
});
