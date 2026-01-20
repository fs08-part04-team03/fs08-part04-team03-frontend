import { describe, it, expect } from 'vitest';
import {
  toOptions,
  filterByIds,
  sumPrices,
  sumBy,
  sumTotal,
  compact,
  groupBy,
  uniqueBy,
  first,
  last,
} from '../array';

describe('toOptions', () => {
  it('객체 배열을 옵션 배열로 변환한다', () => {
    const items = [
      { id: 1, name: '음료' },
      { id: 2, name: '과자' },
    ];
    expect(toOptions(items, 'id', 'name')).toEqual([
      { key: '1', label: '음료' },
      { key: '2', label: '과자' },
    ]);
  });

  it('문자열 키도 처리한다', () => {
    const items = [
      { code: 'A', title: '카테고리A' },
      { code: 'B', title: '카테고리B' },
    ];
    expect(toOptions(items, 'code', 'title')).toEqual([
      { key: 'A', label: '카테고리A' },
      { key: 'B', label: '카테고리B' },
    ]);
  });

  it('빈 배열은 빈 배열을 반환한다', () => {
    expect(toOptions([], 'id', 'name')).toEqual([]);
  });

  it('다양한 타입의 값을 문자열로 변환한다', () => {
    const items = [{ id: 0, name: null }];
    const result = toOptions(items, 'id', 'name');
    expect(result[0]?.key).toBe('0');
    expect(result[0]?.label).toBe('null');
  });
});

describe('filterByIds', () => {
  const items = [
    { id: '1', name: 'A' },
    { id: '2', name: 'B' },
    { id: '3', name: 'C' },
  ];

  it('문자열 ID 목록으로 배열을 필터링한다', () => {
    expect(filterByIds(items, ['1', '3'], 'id')).toEqual([
      { id: '1', name: 'A' },
      { id: '3', name: 'C' },
    ]);
  });

  it('숫자 ID도 문자열로 비교하여 필터링한다', () => {
    const numItems = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
    ];
    expect(filterByIds(numItems, [1], 'id')).toEqual([{ id: 1, name: 'A' }]);
  });

  it('존재하지 않는 ID는 무시한다', () => {
    expect(filterByIds(items, ['1', '999'], 'id')).toEqual([{ id: '1', name: 'A' }]);
  });

  it('빈 ID 목록은 빈 배열을 반환한다', () => {
    expect(filterByIds(items, [], 'id')).toEqual([]);
  });

  it('빈 배열은 빈 배열을 반환한다', () => {
    expect(filterByIds([], ['1'], 'id')).toEqual([]);
  });

  it('기본 idField는 "id"이다', () => {
    const result = filterByIds(items, ['1']);
    expect(result).toEqual([{ id: '1', name: 'A' }]);
  });
});

describe('sumPrices', () => {
  it('price * quantity 합계를 계산한다', () => {
    const items = [
      { price: 1000, quantity: 2 },
      { price: 500, quantity: 3 },
    ];
    expect(sumPrices(items)).toBe(3500);
  });

  it('quantity가 없으면 1로 계산한다', () => {
    const items = [{ price: 1000 }, { price: 500 }];
    expect(sumPrices(items)).toBe(1500);
  });

  it('빈 배열은 0을 반환한다', () => {
    expect(sumPrices([])).toBe(0);
  });

  it('quantity가 0인 경우', () => {
    const items = [
      { price: 1000, quantity: 0 },
      { price: 500, quantity: 2 },
    ];
    expect(sumPrices(items)).toBe(1000);
  });

  it('소수점 가격도 계산한다', () => {
    const items = [
      { price: 10.5, quantity: 2 },
      { price: 5.25, quantity: 4 },
    ];
    expect(sumPrices(items)).toBe(42);
  });
});

describe('sumBy', () => {
  it('특정 필드의 합계를 계산한다', () => {
    const items = [{ value: 10 }, { value: 20 }, { value: 30 }];
    expect(sumBy(items, 'value')).toBe(60);
  });

  it('숫자가 아닌 필드는 0으로 처리한다', () => {
    const items = [{ value: 'text' as unknown as number }, { value: 20 }];
    expect(sumBy(items, 'value')).toBe(20);
  });

  it('빈 배열은 0을 반환한다', () => {
    expect(sumBy([], 'value')).toBe(0);
  });

  it('음수도 계산한다', () => {
    const items = [{ value: 10 }, { value: -5 }, { value: 3 }];
    expect(sumBy(items, 'value')).toBe(8);
  });

  it('다양한 필드명을 지원한다', () => {
    const items = [{ amount: 100 }, { amount: 200 }];
    expect(sumBy(items, 'amount')).toBe(300);
  });
});

describe('sumTotal', () => {
  it('price * quantity를 다양한 필드명으로 계산한다', () => {
    const items = [
      { unitPrice: 1000, qty: 2 },
      { unitPrice: 500, qty: 3 },
    ];
    expect(sumTotal(items, 'unitPrice', 'qty')).toBe(3500);
  });

  it('숫자가 아닌 필드는 0 또는 1로 처리한다', () => {
    const items = [{ price: 'invalid' as unknown as number, quantity: 2 }];
    expect(sumTotal(items, 'price', 'quantity')).toBe(0);
  });

  it('빈 배열은 0을 반환한다', () => {
    expect(sumTotal([], 'price', 'quantity')).toBe(0);
  });
});

describe('compact', () => {
  it('null을 제거한다', () => {
    expect(compact([1, null, 2])).toEqual([1, 2]);
  });

  it('undefined를 제거한다', () => {
    expect(compact([1, undefined, 2])).toEqual([1, 2]);
  });

  it('null과 undefined를 모두 제거한다', () => {
    expect(compact([1, null, 2, undefined, 3])).toEqual([1, 2, 3]);
  });

  it('0, 빈 문자열, false는 유지한다', () => {
    expect(compact([0, '', false, null])).toEqual([0, '', false]);
  });

  it('빈 배열은 빈 배열을 반환한다', () => {
    expect(compact([])).toEqual([]);
  });

  it('null/undefined가 없으면 원본과 동일한 배열을 반환한다', () => {
    expect(compact([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('객체 배열에서도 동작한다', () => {
    const items = [{ id: 1 }, null, { id: 2 }, undefined];
    expect(compact(items)).toEqual([{ id: 1 }, { id: 2 }]);
  });
});

describe('groupBy', () => {
  it('특정 필드를 기준으로 그룹화한다', () => {
    const items = [
      { category: 'A', name: '1' },
      { category: 'B', name: '2' },
      { category: 'A', name: '3' },
    ];
    const result = groupBy(items, 'category');

    expect(Object.keys(result)).toHaveLength(2);
    expect(result.A).toHaveLength(2);
    expect(result.B).toHaveLength(1);
  });

  it('그룹 내 항목 순서를 유지한다', () => {
    const items = [
      { category: 'A', order: 1 },
      { category: 'A', order: 2 },
      { category: 'A', order: 3 },
    ];
    const result = groupBy(items, 'category');

    expect(result.A?.[0]?.order).toBe(1);
    expect(result.A?.[1]?.order).toBe(2);
    expect(result.A?.[2]?.order).toBe(3);
  });

  it('빈 배열은 빈 객체를 반환한다', () => {
    expect(groupBy([], 'category')).toEqual({});
  });

  it('숫자 키도 문자열로 변환하여 그룹화한다', () => {
    const items = [
      { type: 1, name: 'A' },
      { type: 2, name: 'B' },
      { type: 1, name: 'C' },
    ];
    const result = groupBy(items, 'type');

    expect(result['1']).toHaveLength(2);
    expect(result['2']).toHaveLength(1);
  });
});

describe('uniqueBy', () => {
  it('중복을 제거하고 첫 번째 항목을 유지한다', () => {
    const items = [
      { id: 1, name: 'first' },
      { id: 2, name: 'second' },
      { id: 1, name: 'duplicate' },
    ];
    const result = uniqueBy(items, 'id');

    expect(result).toHaveLength(2);
    expect(result[0]?.name).toBe('first');
    expect(result[1]?.name).toBe('second');
  });

  it('중복이 없으면 원본과 동일한 배열을 반환한다', () => {
    const items = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
    ];
    expect(uniqueBy(items, 'id')).toEqual(items);
  });

  it('빈 배열은 빈 배열을 반환한다', () => {
    expect(uniqueBy([], 'id')).toEqual([]);
  });

  it('문자열 키도 처리한다', () => {
    const items = [
      { code: 'A', value: 1 },
      { code: 'B', value: 2 },
      { code: 'A', value: 3 },
    ];
    const result = uniqueBy(items, 'code');

    expect(result).toHaveLength(2);
    expect(result[0]?.value).toBe(1);
  });

  it('원본 배열의 순서를 유지한다', () => {
    const items = [
      { id: 3, order: 1 },
      { id: 1, order: 2 },
      { id: 2, order: 3 },
      { id: 1, order: 4 },
    ];
    const result = uniqueBy(items, 'id');

    expect(result.map((item) => item.id)).toEqual([3, 1, 2]);
  });
});

describe('first', () => {
  it('첫 번째 요소를 반환한다', () => {
    expect(first([1, 2, 3])).toBe(1);
  });

  it('단일 요소 배열에서 해당 요소를 반환한다', () => {
    expect(first([42])).toBe(42);
  });

  it('빈 배열은 undefined를 반환한다', () => {
    expect(first([])).toBeUndefined();
  });

  it('객체 배열에서도 동작한다', () => {
    const items = [{ id: 1 }, { id: 2 }];
    expect(first(items)).toEqual({ id: 1 });
  });

  it('null/undefined 요소도 반환한다', () => {
    expect(first([null, 1, 2])).toBeNull();
    expect(first([undefined, 1, 2])).toBeUndefined();
  });
});

describe('last', () => {
  it('마지막 요소를 반환한다', () => {
    expect(last([1, 2, 3])).toBe(3);
  });

  it('단일 요소 배열에서 해당 요소를 반환한다', () => {
    expect(last([42])).toBe(42);
  });

  it('빈 배열은 undefined를 반환한다', () => {
    expect(last([])).toBeUndefined();
  });

  it('객체 배열에서도 동작한다', () => {
    const items = [{ id: 1 }, { id: 2 }];
    expect(last(items)).toEqual({ id: 2 });
  });

  it('null/undefined 요소도 반환한다', () => {
    expect(last([1, 2, null])).toBeNull();
    expect(last([1, 2, undefined])).toBeUndefined();
  });
});
