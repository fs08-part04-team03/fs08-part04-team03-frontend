import { describe, it, expect } from 'vitest';
import { updateUrlParams, getNumberParam, getStringParam, buildUrl } from '../urlParams';

describe('updateUrlParams', () => {
  describe('파라미터 추가/수정', () => {
    it('새 파라미터를 추가한다', () => {
      const params = new URLSearchParams('page=1');
      const result = updateUrlParams(params, { sort: 'price' });

      expect(result).toContain('page=1');
      expect(result).toContain('sort=price');
    });

    it('기존 파라미터를 수정한다', () => {
      const params = new URLSearchParams('page=1&sort=name');
      const result = updateUrlParams(params, { page: 2 });

      expect(result).toContain('page=2');
      expect(result).toContain('sort=name');
    });

    it('여러 파라미터를 동시에 업데이트한다', () => {
      const params = new URLSearchParams('page=1');
      const result = updateUrlParams(params, { page: 2, sort: 'price', category: 'food' });

      expect(result).toContain('page=2');
      expect(result).toContain('sort=price');
      expect(result).toContain('category=food');
    });
  });

  describe('파라미터 제거', () => {
    it('null 값으로 파라미터를 제거한다', () => {
      const params = new URLSearchParams('page=1&sort=price');
      const result = updateUrlParams(params, { sort: null });

      expect(result).toBe('page=1');
    });

    it('undefined 값으로 파라미터를 제거한다', () => {
      const params = new URLSearchParams('page=1&sort=price');
      const result = updateUrlParams(params, { sort: undefined });

      expect(result).toBe('page=1');
    });

    it('빈 문자열로 파라미터를 제거한다', () => {
      const params = new URLSearchParams('page=1&sort=price');
      const result = updateUrlParams(params, { sort: '' });

      expect(result).toBe('page=1');
    });

    it('존재하지 않는 파라미터 제거는 무시된다', () => {
      const params = new URLSearchParams('page=1');
      const result = updateUrlParams(params, { nonexistent: null });

      expect(result).toBe('page=1');
    });
  });

  describe('타입 변환', () => {
    it('숫자를 문자열로 변환한다', () => {
      const params = new URLSearchParams();
      const result = updateUrlParams(params, { page: 2, size: 10 });

      expect(result).toContain('page=2');
      expect(result).toContain('size=10');
    });

    it('boolean을 문자열로 변환한다', () => {
      const params = new URLSearchParams();
      const result = updateUrlParams(params, { active: true, disabled: false });

      expect(result).toContain('active=true');
      expect(result).toContain('disabled=false');
    });

    it('0도 유효한 값으로 처리한다', () => {
      const params = new URLSearchParams();
      const result = updateUrlParams(params, { page: 0 });

      expect(result).toBe('page=0');
    });
  });

  describe('문자열 입력', () => {
    it('문자열 파라미터도 처리한다', () => {
      const result = updateUrlParams('page=1&sort=name', { page: 2 });

      expect(result).toContain('page=2');
      expect(result).toContain('sort=name');
    });

    it('빈 문자열 파라미터도 처리한다', () => {
      const result = updateUrlParams('', { page: 1 });

      expect(result).toBe('page=1');
    });
  });

  describe('복합 시나리오', () => {
    it('추가, 수정, 삭제를 동시에 처리한다', () => {
      const params = new URLSearchParams('page=1&sort=name&filter=active');
      const result = updateUrlParams(params, {
        page: 2, // 수정
        sort: null, // 삭제
        category: 'food', // 추가
      });

      expect(result).toContain('page=2');
      expect(result).not.toContain('sort=');
      expect(result).toContain('category=food');
      expect(result).toContain('filter=active');
    });
  });
});

describe('getNumberParam', () => {
  describe('기본 동작', () => {
    it('숫자 파라미터를 파싱한다', () => {
      const params = new URLSearchParams('page=5');
      expect(getNumberParam(params, 'page', 1)).toBe(5);
    });

    it('없는 파라미터는 기본값을 반환한다', () => {
      const params = new URLSearchParams();
      expect(getNumberParam(params, 'page', 1)).toBe(1);
    });

    it('유효하지 않은 숫자는 기본값을 반환한다', () => {
      const params = new URLSearchParams('page=abc');
      expect(getNumberParam(params, 'page', 1)).toBe(1);
    });

    it('빈 문자열은 기본값을 반환한다', () => {
      const params = new URLSearchParams('page=');
      expect(getNumberParam(params, 'page', 1)).toBe(1);
    });
  });

  describe('범위 제한', () => {
    it('min 옵션을 적용한다', () => {
      const params = new URLSearchParams('page=-5');
      expect(getNumberParam(params, 'page', 1, { min: 1 })).toBe(1);
    });

    it('max 옵션을 적용한다', () => {
      const params = new URLSearchParams('page=100');
      expect(getNumberParam(params, 'page', 1, { max: 50 })).toBe(50);
    });

    it('min과 max를 동시에 적용한다', () => {
      const params = new URLSearchParams('page=0');
      expect(getNumberParam(params, 'page', 5, { min: 1, max: 100 })).toBe(1);

      const params2 = new URLSearchParams('page=200');
      expect(getNumberParam(params2, 'page', 5, { min: 1, max: 100 })).toBe(100);

      const params3 = new URLSearchParams('page=50');
      expect(getNumberParam(params3, 'page', 5, { min: 1, max: 100 })).toBe(50);
    });

    it('범위 내 값은 그대로 반환한다', () => {
      const params = new URLSearchParams('size=25');
      expect(getNumberParam(params, 'size', 10, { min: 1, max: 100 })).toBe(25);
    });
  });

  describe('특수 케이스', () => {
    it('소수점 숫자는 정수로 파싱한다', () => {
      const params = new URLSearchParams('page=3.7');
      expect(getNumberParam(params, 'page', 1)).toBe(3);
    });

    it('음수도 파싱한다', () => {
      const params = new URLSearchParams('offset=-10');
      expect(getNumberParam(params, 'offset', 0)).toBe(-10);
    });

    it('0도 유효한 값으로 처리한다', () => {
      const params = new URLSearchParams('page=0');
      expect(getNumberParam(params, 'page', 1)).toBe(0);
    });
  });
});

describe('getStringParam', () => {
  describe('기본 동작', () => {
    it('문자열 파라미터를 반환한다', () => {
      const params = new URLSearchParams('sort=price');
      expect(getStringParam(params, 'sort')).toBe('price');
    });

    it('없는 파라미터는 undefined를 반환한다', () => {
      const params = new URLSearchParams();
      expect(getStringParam(params, 'sort')).toBeUndefined();
    });

    it('없는 파라미터에 기본값을 적용한다', () => {
      const params = new URLSearchParams();
      expect(getStringParam(params, 'sort', 'default')).toBe('default');
    });
  });

  describe('빈 값 처리', () => {
    it('빈 문자열은 기본값을 반환한다', () => {
      const params = new URLSearchParams('sort=');
      expect(getStringParam(params, 'sort', 'default')).toBe('default');
    });

    it('빈 문자열이고 기본값이 없으면 undefined를 반환한다', () => {
      const params = new URLSearchParams('sort=');
      expect(getStringParam(params, 'sort')).toBeUndefined();
    });
  });

  describe('특수 문자', () => {
    it('URL 인코딩된 값을 디코딩한다', () => {
      const params = new URLSearchParams('query=%ED%95%9C%EA%B8%80');
      expect(getStringParam(params, 'query')).toBe('한글');
    });

    it('공백이 포함된 값을 처리한다', () => {
      const params = new URLSearchParams('query=hello+world');
      expect(getStringParam(params, 'query')).toBe('hello world');
    });
  });
});

describe('buildUrl', () => {
  describe('기본 동작', () => {
    it('pathname과 params를 결합한다', () => {
      expect(buildUrl('/products', 'page=1')).toBe('/products?page=1');
    });

    it('여러 파라미터를 결합한다', () => {
      expect(buildUrl('/products', 'page=1&sort=price')).toBe('/products?page=1&sort=price');
    });
  });

  describe('빈 파라미터', () => {
    it('params가 빈 문자열이면 pathname만 반환한다', () => {
      expect(buildUrl('/products', '')).toBe('/products');
    });
  });

  describe('다양한 경로', () => {
    it('루트 경로를 처리한다', () => {
      expect(buildUrl('/', 'page=1')).toBe('/?page=1');
    });

    it('중첩 경로를 처리한다', () => {
      expect(buildUrl('/admin/users/list', 'page=1')).toBe('/admin/users/list?page=1');
    });

    it('동적 경로 세그먼트를 처리한다', () => {
      expect(buildUrl('/products/123/detail', 'tab=reviews')).toBe(
        '/products/123/detail?tab=reviews'
      );
    });
  });
});
