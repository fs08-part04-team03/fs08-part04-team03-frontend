/**
 * 배열 관련 공통 유틸리티 함수
 *
 * 프로젝트 전반에서 반복적으로 사용되는 배열 순회 패턴을 통합하여
 * 코드 중복을 줄이고 일관성을 높입니다.
 */

/**
 * 객체 배열을 옵션 배열로 변환합니다.
 * 주로 드롭다운, 셀렉트 등의 옵션 목록 생성에 사용됩니다.
 *
 * @example
 * const categories = [{ id: 1, name: '음료' }, { id: 2, name: '과자' }];
 * toOptions(categories, 'id', 'name');
 * // [{ key: '1', label: '음료' }, { key: '2', label: '과자' }]
 */
export function toOptions<T>(
  items: T[],
  keyField: keyof T,
  labelField: keyof T
): Array<{ key: string; label: string }> {
  return items.map((item) => ({
    key: String(item[keyField]),
    label: String(item[labelField]),
  }));
}

/**
 * ID 목록으로 배열을 필터링합니다.
 * Set을 사용하여 O(n) 시간 복잡도로 필터링합니다.
 *
 * @example
 * const items = [{ id: '1', name: 'A' }, { id: '2', name: 'B' }];
 * filterByIds(items, ['1'], 'id');
 * // [{ id: '1', name: 'A' }]
 */
export function filterByIds<T>(
  items: T[],
  ids: (string | number)[],
  idField: keyof T = 'id' as keyof T
): T[] {
  const idSet = new Set(ids.map(String));
  return items.filter((item) => idSet.has(String(item[idField])));
}

/**
 * 가격 합계를 계산합니다.
 * price와 quantity 필드를 가진 객체 배열의 총액을 계산합니다.
 *
 * @example
 * const items = [{ price: 1000, quantity: 2 }, { price: 500, quantity: 3 }];
 * sumPrices(items);
 * // 3500
 */
export function sumPrices<T extends { price: number; quantity?: number }>(items: T[]): number {
  return items.reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0);
}

/**
 * 특정 필드의 합계를 계산합니다.
 * 가격 외의 다양한 숫자 필드에 사용할 수 있습니다.
 *
 * @example
 * const items = [{ value: 10 }, { value: 20 }];
 * sumBy(items, 'value');
 * // 30
 */
export function sumBy<T>(items: T[], field: keyof T): number {
  return items.reduce((sum, item) => {
    const value = item[field];
    return sum + (typeof value === 'number' ? value : 0);
  }, 0);
}

/**
 * 가격 * 수량의 합계를 계산합니다 (다양한 필드명 지원)
 *
 * @example
 * const items = [{ unitPrice: 1000, quantity: 2 }];
 * sumTotal(items, 'unitPrice', 'quantity');
 * // 2000
 */
export function sumTotal<T>(items: T[], priceField: keyof T, quantityField: keyof T): number {
  return items.reduce((sum, item) => {
    const price = item[priceField];
    const quantity = item[quantityField];
    const priceNum = typeof price === 'number' ? price : 0;
    const quantityNum = typeof quantity === 'number' ? quantity : 1;
    return sum + priceNum * quantityNum;
  }, 0);
}

/**
 * null 또는 undefined 값을 배열에서 제거합니다.
 * TypeScript의 타입 가드를 활용하여 타입 안전성을 보장합니다.
 *
 * @example
 * const items = [1, null, 2, undefined, 3];
 * compact(items);
 * // [1, 2, 3]
 */
export function compact<T>(items: (T | null | undefined)[]): T[] {
  return items.filter((item): item is T => item != null);
}

/**
 * 배열을 특정 필드를 기준으로 그룹화합니다.
 *
 * @example
 * const items = [
 *   { category: 'A', name: '1' },
 *   { category: 'B', name: '2' },
 *   { category: 'A', name: '3' },
 * ];
 * groupBy(items, 'category');
 * // { A: [{ category: 'A', name: '1' }, { category: 'A', name: '3' }], B: [{ category: 'B', name: '2' }] }
 */
export function groupBy<T>(items: T[], keyField: keyof T): Record<string, T[]> {
  const result: Record<string, T[]> = {};

  items.forEach((item) => {
    const key = String(item[keyField]);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  });

  return result;
}

/**
 * 배열에서 특정 필드의 고유한 값들을 추출합니다.
 *
 * @example
 * const items = [{ id: 1 }, { id: 2 }, { id: 1 }];
 * uniqueBy(items, 'id');
 * // [{ id: 1 }, { id: 2 }]
 */
export function uniqueBy<T>(items: T[], keyField: keyof T): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = String(item[keyField]);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

/**
 * 첫 번째 요소를 반환하거나 undefined를 반환합니다.
 * 빈 배열에서도 안전하게 사용할 수 있습니다.
 *
 * @example
 * first([1, 2, 3]); // 1
 * first([]); // undefined
 */
export function first<T>(items: T[]): T | undefined {
  return items[0];
}

/**
 * 마지막 요소를 반환하거나 undefined를 반환합니다.
 *
 * @example
 * last([1, 2, 3]); // 3
 * last([]); // undefined
 */
export function last<T>(items: T[]): T | undefined {
  return items[items.length - 1];
}
