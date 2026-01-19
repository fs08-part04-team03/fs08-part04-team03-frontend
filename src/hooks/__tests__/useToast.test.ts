import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useToast } from '../useToast';

describe('useToast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('초기 상태', () => {
    it('토스트가 숨겨진 상태로 시작한다', () => {
      const { result } = renderHook(() => useToast());

      expect(result.current.showToast).toBe(false);
      expect(result.current.toastMessage).toBe('');
      expect(result.current.toastVariant).toBe('success');
    });
  });

  describe('triggerToast', () => {
    it('success 토스트를 표시한다', () => {
      const { result } = renderHook(() => useToast());

      act(() => {
        result.current.triggerToast('success', '저장되었습니다.');
      });

      expect(result.current.showToast).toBe(true);
      expect(result.current.toastVariant).toBe('success');
      expect(result.current.toastMessage).toBe('저장되었습니다.');
    });

    it('error 토스트를 표시한다', () => {
      const { result } = renderHook(() => useToast());

      act(() => {
        result.current.triggerToast('error', '오류가 발생했습니다.');
      });

      expect(result.current.showToast).toBe(true);
      expect(result.current.toastVariant).toBe('error');
      expect(result.current.toastMessage).toBe('오류가 발생했습니다.');
    });

    it('custom 토스트를 표시한다', () => {
      const { result } = renderHook(() => useToast());

      act(() => {
        result.current.triggerToast('custom', '커스텀 메시지');
      });

      expect(result.current.showToast).toBe(true);
      expect(result.current.toastVariant).toBe('custom');
      expect(result.current.toastMessage).toBe('커스텀 메시지');
    });

    it('빈 메시지도 처리한다', () => {
      const { result } = renderHook(() => useToast());

      act(() => {
        result.current.triggerToast('success', '');
      });

      expect(result.current.showToast).toBe(true);
      expect(result.current.toastMessage).toBe('');
    });

    it('연속 호출 시 마지막 메시지로 업데이트된다', () => {
      const { result } = renderHook(() => useToast());

      act(() => {
        result.current.triggerToast('success', '첫 번째');
        result.current.triggerToast('error', '두 번째');
        result.current.triggerToast('custom', '세 번째');
      });

      expect(result.current.showToast).toBe(true);
      expect(result.current.toastVariant).toBe('custom');
      expect(result.current.toastMessage).toBe('세 번째');
    });
  });

  describe('자동 닫기', () => {
    it('기본 3초 후 자동으로 닫힌다', () => {
      const { result } = renderHook(() => useToast());

      act(() => {
        result.current.triggerToast('success', '메시지');
      });

      expect(result.current.showToast).toBe(true);

      // 2.9초 경과 - 아직 열려있음
      act(() => {
        vi.advanceTimersByTime(2999);
      });
      expect(result.current.showToast).toBe(true);

      // 3초 경과 - 닫힘
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(result.current.showToast).toBe(false);
    });

    it('커스텀 duration을 설정할 수 있다', () => {
      const { result } = renderHook(() => useToast(5000));

      act(() => {
        result.current.triggerToast('success', '메시지');
      });

      // 3초 경과 - 아직 열려있음
      act(() => {
        vi.advanceTimersByTime(3000);
      });
      expect(result.current.showToast).toBe(true);

      // 5초 경과 - 닫힘
      act(() => {
        vi.advanceTimersByTime(2000);
      });
      expect(result.current.showToast).toBe(false);
    });

    it('짧은 duration을 설정할 수 있다', () => {
      const { result } = renderHook(() => useToast(1000));

      act(() => {
        result.current.triggerToast('success', '빠른 메시지');
      });

      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(result.current.showToast).toBe(false);
    });

    it('0ms duration은 즉시 닫힌다', () => {
      const { result } = renderHook(() => useToast(0));

      act(() => {
        result.current.triggerToast('success', '메시지');
      });

      act(() => {
        vi.advanceTimersByTime(0);
      });
      expect(result.current.showToast).toBe(false);
    });
  });

  describe('closeToast', () => {
    it('수동으로 토스트를 닫을 수 있다', () => {
      const { result } = renderHook(() => useToast());

      act(() => {
        result.current.triggerToast('success', '메시지');
      });
      expect(result.current.showToast).toBe(true);

      act(() => {
        result.current.closeToast();
      });
      expect(result.current.showToast).toBe(false);
    });

    it('이미 닫힌 토스트를 닫아도 에러가 발생하지 않는다', () => {
      const { result } = renderHook(() => useToast());

      expect(result.current.showToast).toBe(false);

      act(() => {
        result.current.closeToast();
      });
      expect(result.current.showToast).toBe(false);
    });

    it('수동으로 닫은 후 자동 닫기 타이머는 영향받지 않는다', () => {
      const { result } = renderHook(() => useToast(5000));

      act(() => {
        result.current.triggerToast('success', '메시지');
      });

      // 1초 후 수동으로 닫음
      act(() => {
        vi.advanceTimersByTime(1000);
        result.current.closeToast();
      });
      expect(result.current.showToast).toBe(false);

      // 나머지 시간이 지나도 에러 없음
      act(() => {
        vi.advanceTimersByTime(4000);
      });
      expect(result.current.showToast).toBe(false);
    });
  });

  describe('다시 트리거', () => {
    it('닫힌 후 다시 트리거할 수 있다', () => {
      const { result } = renderHook(() => useToast(1000));

      // 첫 번째 토스트
      act(() => {
        result.current.triggerToast('success', '첫 번째');
      });
      expect(result.current.showToast).toBe(true);

      // 자동 닫힘
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(result.current.showToast).toBe(false);

      // 두 번째 토스트
      act(() => {
        result.current.triggerToast('error', '두 번째');
      });
      expect(result.current.showToast).toBe(true);
      expect(result.current.toastVariant).toBe('error');
      expect(result.current.toastMessage).toBe('두 번째');
    });

    it('열려있는 동안 다시 트리거하면 메시지가 업데이트된다', () => {
      const { result } = renderHook(() => useToast(3000));

      act(() => {
        result.current.triggerToast('success', '첫 번째');
      });

      // 2초 경과
      act(() => {
        vi.advanceTimersByTime(2000);
      });
      expect(result.current.showToast).toBe(true);

      // 다시 트리거 (메시지 업데이트)
      act(() => {
        result.current.triggerToast('error', '두 번째');
      });

      // 메시지가 업데이트됨
      expect(result.current.toastVariant).toBe('error');
      expect(result.current.toastMessage).toBe('두 번째');
      expect(result.current.showToast).toBe(true);
    });
  });

  describe('함수 안정성', () => {
    it('triggerToast 함수는 리렌더링 시에도 동일하다', () => {
      const { result, rerender } = renderHook(() => useToast());

      const firstTrigger = result.current.triggerToast;

      rerender();

      expect(result.current.triggerToast).toBe(firstTrigger);
    });

    it('closeToast 함수는 리렌더링 시에도 동일하다', () => {
      const { result, rerender } = renderHook(() => useToast());

      const firstClose = result.current.closeToast;

      rerender();

      expect(result.current.closeToast).toBe(firstClose);
    });
  });
});
