import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('초기 상태', () => {
    it('초기값을 즉시 반환한다', () => {
      const { result } = renderHook(() => useDebounce('initial', 500));
      expect(result.current).toBe('initial');
    });

    it('delay 전에는 초기값을 유지한다', () => {
      const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
        initialProps: { value: 'initial', delay: 500 },
      });

      rerender({ value: 'updated', delay: 500 });

      // 499ms 경과 - 아직 업데이트 안됨
      act(() => {
        vi.advanceTimersByTime(499);
      });
      expect(result.current).toBe('initial');
    });
  });

  describe('debounce 동작', () => {
    it('delay 후에 값이 업데이트된다', () => {
      const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
        initialProps: { value: 'initial', delay: 500 },
      });

      rerender({ value: 'updated', delay: 500 });

      act(() => {
        vi.advanceTimersByTime(500);
      });
      expect(result.current).toBe('updated');
    });

    it('연속 변경 시 마지막 값만 적용된다', () => {
      const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
        initialProps: { value: 'a', delay: 500 },
      });

      // 빠르게 여러 번 변경
      rerender({ value: 'b', delay: 500 });
      act(() => {
        vi.advanceTimersByTime(200);
      });

      rerender({ value: 'c', delay: 500 });
      act(() => {
        vi.advanceTimersByTime(200);
      });

      rerender({ value: 'd', delay: 500 });

      // 아직 debounce 중
      expect(result.current).toBe('a');

      // 마지막 변경 후 500ms 경과
      act(() => {
        vi.advanceTimersByTime(500);
      });
      expect(result.current).toBe('d');
    });

    it('값이 동일하면 타이머가 리셋되지 않는다', () => {
      const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
        initialProps: { value: 'same', delay: 500 },
      });

      rerender({ value: 'same', delay: 500 });

      act(() => {
        vi.advanceTimersByTime(500);
      });
      expect(result.current).toBe('same');
    });
  });

  describe('다양한 delay 값', () => {
    it('0ms delay는 즉시 업데이트된다', () => {
      const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
        initialProps: { value: 'initial', delay: 0 },
      });

      rerender({ value: 'updated', delay: 0 });

      act(() => {
        vi.advanceTimersByTime(0);
      });
      expect(result.current).toBe('updated');
    });

    it('긴 delay도 정상 동작한다', () => {
      const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
        initialProps: { value: 'initial', delay: 5000 },
      });

      rerender({ value: 'updated', delay: 5000 });

      act(() => {
        vi.advanceTimersByTime(4999);
      });
      expect(result.current).toBe('initial');

      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(result.current).toBe('updated');
    });

    it('delay 변경 시 새로운 delay가 적용된다', () => {
      const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
        initialProps: { value: 'initial', delay: 500 },
      });

      // delay를 1000으로 변경
      rerender({ value: 'updated', delay: 1000 });

      act(() => {
        vi.advanceTimersByTime(500);
      });
      expect(result.current).toBe('initial'); // 아직 안됨

      act(() => {
        vi.advanceTimersByTime(500);
      });
      expect(result.current).toBe('updated'); // 1000ms 후 업데이트
    });
  });

  describe('다양한 타입 지원', () => {
    it('숫자 타입을 지원한다', () => {
      const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
        initialProps: { value: 42, delay: 500 },
      });

      expect(result.current).toBe(42);

      rerender({ value: 100, delay: 500 });
      act(() => {
        vi.advanceTimersByTime(500);
      });
      expect(result.current).toBe(100);
    });

    it('객체 타입을 지원한다', () => {
      const initialObj = { name: 'test', count: 0 };
      const updatedObj = { name: 'updated', count: 1 };

      const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
        initialProps: { value: initialObj, delay: 500 },
      });

      expect(result.current).toEqual(initialObj);

      rerender({ value: updatedObj, delay: 500 });
      act(() => {
        vi.advanceTimersByTime(500);
      });
      expect(result.current).toEqual(updatedObj);
    });

    it('배열 타입을 지원한다', () => {
      const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
        initialProps: { value: [1, 2, 3], delay: 500 },
      });

      expect(result.current).toEqual([1, 2, 3]);

      rerender({ value: [4, 5, 6], delay: 500 });
      act(() => {
        vi.advanceTimersByTime(500);
      });
      expect(result.current).toEqual([4, 5, 6]);
    });

    it('null과 undefined를 지원한다', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounce<string | null>(value, delay),
        { initialProps: { value: 'initial' as string | null, delay: 500 } }
      );

      rerender({ value: null, delay: 500 });
      act(() => {
        vi.advanceTimersByTime(500);
      });
      expect(result.current).toBeNull();
    });
  });

  describe('클린업', () => {
    it('언마운트 시 타이머가 정리된다', () => {
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

      const { unmount, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
        initialProps: { value: 'initial', delay: 500 },
      });

      rerender({ value: 'updated', delay: 500 });
      unmount();

      expect(clearTimeoutSpy).toHaveBeenCalled();
      clearTimeoutSpy.mockRestore();
    });
  });
});
