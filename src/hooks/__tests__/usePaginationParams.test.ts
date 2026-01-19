import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePaginationParams } from '../usePaginationParams';

// Next.js navigation 모킹
const mockPush = vi.fn();
const mockSearchParams = new URLSearchParams();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    back: vi.fn(),
  }),
  useSearchParams: () => mockSearchParams,
  usePathname: () => '/products',
}));

describe('usePaginationParams', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // URLSearchParams 초기화
    mockSearchParams.forEach((_, key) => {
      mockSearchParams.delete(key);
    });
  });

  describe('기본값', () => {
    it('기본 params를 반환한다', () => {
      const { result } = renderHook(() => usePaginationParams());

      expect(result.current.params).toEqual({
        page: 1,
        size: 10,
        status: undefined,
        sort: undefined,
      });
    });

    it('커스텀 defaultSize를 적용한다', () => {
      const { result } = renderHook(() => usePaginationParams({ defaultSize: 20 }));

      expect(result.current.params.size).toBe(20);
    });
  });

  describe('URL에서 파라미터 파싱', () => {
    it('URL의 page 파라미터를 파싱한다', () => {
      mockSearchParams.set('page', '3');

      const { result } = renderHook(() => usePaginationParams());

      expect(result.current.params.page).toBe(3);
    });

    it('URL의 size 파라미터를 파싱한다', () => {
      mockSearchParams.set('size', '25');

      const { result } = renderHook(() => usePaginationParams());

      expect(result.current.params.size).toBe(25);
    });

    it('URL의 status 파라미터를 파싱한다', () => {
      mockSearchParams.set('status', 'active');

      const { result } = renderHook(() => usePaginationParams());

      expect(result.current.params.status).toBe('active');
    });

    it('URL의 sort 파라미터를 파싱한다', () => {
      mockSearchParams.set('sort', 'price');

      const { result } = renderHook(() => usePaginationParams());

      expect(result.current.params.sort).toBe('price');
    });

    it('여러 파라미터를 동시에 파싱한다', () => {
      mockSearchParams.set('page', '2');
      mockSearchParams.set('size', '15');
      mockSearchParams.set('status', 'pending');
      mockSearchParams.set('sort', 'name');

      const { result } = renderHook(() => usePaginationParams());

      expect(result.current.params).toEqual({
        page: 2,
        size: 15,
        status: 'pending',
        sort: 'name',
      });
    });
  });

  describe('size 범위 제한', () => {
    it('minSize 미만은 minSize로 제한된다', () => {
      mockSearchParams.set('size', '0');

      const { result } = renderHook(() => usePaginationParams({ minSize: 1 }));

      expect(result.current.params.size).toBe(1);
    });

    it('maxSize 초과는 maxSize로 제한된다', () => {
      mockSearchParams.set('size', '200');

      const { result } = renderHook(() => usePaginationParams({ maxSize: 100 }));

      expect(result.current.params.size).toBe(100);
    });

    it('커스텀 min/max를 적용한다', () => {
      mockSearchParams.set('size', '5');

      const { result } = renderHook(() => usePaginationParams({ minSize: 10, maxSize: 50 }));

      expect(result.current.params.size).toBe(10);
    });
  });

  describe('page 범위 제한', () => {
    it('page는 최소 1이다', () => {
      mockSearchParams.set('page', '0');

      const { result } = renderHook(() => usePaginationParams());

      expect(result.current.params.page).toBe(1);
    });

    it('음수 page는 1로 제한된다', () => {
      mockSearchParams.set('page', '-5');

      const { result } = renderHook(() => usePaginationParams());

      expect(result.current.params.page).toBe(1);
    });
  });

  describe('handlePageChange', () => {
    it('페이지를 변경하고 URL을 업데이트한다', () => {
      const { result } = renderHook(() => usePaginationParams());

      act(() => {
        result.current.handlePageChange(3);
      });

      expect(mockPush).toHaveBeenCalledWith('/products?page=3');
    });

    it('음수 페이지는 1로 제한된다', () => {
      const { result } = renderHook(() => usePaginationParams());

      act(() => {
        result.current.handlePageChange(-1);
      });

      expect(mockPush).toHaveBeenCalledWith('/products?page=1');
    });

    it('0 페이지는 1로 제한된다', () => {
      const { result } = renderHook(() => usePaginationParams());

      act(() => {
        result.current.handlePageChange(0);
      });

      expect(mockPush).toHaveBeenCalledWith('/products?page=1');
    });

    it('기존 파라미터를 유지하면서 page만 변경한다', () => {
      mockSearchParams.set('sort', 'price');
      mockSearchParams.set('status', 'active');

      const { result } = renderHook(() => usePaginationParams());

      act(() => {
        result.current.handlePageChange(5);
      });

      expect(mockPush).toHaveBeenCalled();
      const calledUrl = mockPush.mock.calls[0]?.[0] as string;
      expect(calledUrl).toContain('page=5');
      expect(calledUrl).toContain('sort=price');
      expect(calledUrl).toContain('status=active');
    });
  });

  describe('handleSortChange', () => {
    it('정렬을 변경하고 page를 1로 리셋한다', () => {
      mockSearchParams.set('page', '5');

      const { result } = renderHook(() => usePaginationParams());

      act(() => {
        result.current.handleSortChange('price');
      });

      expect(mockPush).toHaveBeenCalled();
      const calledUrl = mockPush.mock.calls[0]?.[0] as string;
      expect(calledUrl).toContain('sort=price');
      expect(calledUrl).toContain('page=1');
    });

    it('기본 정렬키와 같으면 sort 파라미터를 제거한다', () => {
      mockSearchParams.set('sort', 'price');

      const { result } = renderHook(() => usePaginationParams({ defaultSortKey: 'createdAt' }));

      act(() => {
        result.current.handleSortChange('createdAt');
      });

      expect(mockPush).toHaveBeenCalled();
      const calledUrl = mockPush.mock.calls[0]?.[0] as string;
      expect(calledUrl).not.toContain('sort=');
    });

    it('undefined를 전달하면 sort 파라미터를 제거한다', () => {
      mockSearchParams.set('sort', 'price');

      const { result } = renderHook(() => usePaginationParams());

      act(() => {
        result.current.handleSortChange(undefined);
      });

      expect(mockPush).toHaveBeenCalled();
      const calledUrl = mockPush.mock.calls[0]?.[0] as string;
      expect(calledUrl).not.toContain('sort=');
    });
  });

  describe('handleStatusChange', () => {
    it('상태를 변경하고 page를 1로 리셋한다', () => {
      mockSearchParams.set('page', '5');

      const { result } = renderHook(() => usePaginationParams());

      act(() => {
        result.current.handleStatusChange('active');
      });

      expect(mockPush).toHaveBeenCalled();
      const calledUrl = mockPush.mock.calls[0]?.[0] as string;
      expect(calledUrl).toContain('status=active');
      expect(calledUrl).toContain('page=1');
    });

    it('ALL을 전달하면 status 파라미터를 제거한다', () => {
      mockSearchParams.set('status', 'active');

      const { result } = renderHook(() => usePaginationParams());

      act(() => {
        result.current.handleStatusChange('ALL');
      });

      expect(mockPush).toHaveBeenCalled();
      const calledUrl = mockPush.mock.calls[0]?.[0] as string;
      expect(calledUrl).not.toContain('status=');
    });

    it('undefined를 전달하면 status 파라미터를 제거한다', () => {
      mockSearchParams.set('status', 'active');

      const { result } = renderHook(() => usePaginationParams());

      act(() => {
        result.current.handleStatusChange(undefined);
      });

      expect(mockPush).toHaveBeenCalled();
      const calledUrl = mockPush.mock.calls[0]?.[0] as string;
      expect(calledUrl).not.toContain('status=');
    });
  });

  describe('함수 존재 확인', () => {
    it('핸들러 함수들이 정의되어 있다', () => {
      const { result } = renderHook(() => usePaginationParams());

      expect(typeof result.current.handlePageChange).toBe('function');
      expect(typeof result.current.handleSortChange).toBe('function');
      expect(typeof result.current.handleStatusChange).toBe('function');
    });
  });
});
