import { useState, useEffect, useCallback } from 'react';

type ToastVariant = 'success' | 'error' | 'custom';

interface UseToastReturn {
  showToast: boolean;
  toastVariant: ToastVariant;
  toastMessage: string;
  triggerToast: (variant: ToastVariant, message: string) => void;
  closeToast: () => void;
}

/**
 * Toast 메시지 관리를 위한 커스텀 훅
 *
 * @param autoCloseDuration - 토스트가 자동으로 닫히는 시간 (밀리초, 기본값: 3000ms)
 * @returns showToast, toastVariant, toastMessage, triggerToast, closeToast
 *
 * @example
 * ```tsx
 * const { showToast, toastVariant, toastMessage, triggerToast, closeToast } = useToast();
 *
 * // 성공 메시지 표시
 * triggerToast('success', '저장되었습니다.');
 *
 * // 에러 메시지 표시
 * triggerToast('error', '오류가 발생했습니다.');
 * ```
 */
export const useToast = (autoCloseDuration: number = 3000): UseToastReturn => {
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState<ToastVariant>('success');
  const [toastMessage, setToastMessage] = useState('');

  // 토스트 자동 닫기
  useEffect(() => {
    if (!showToast) {
      return undefined;
    }

    const timer = setTimeout(() => {
      setShowToast(false);
    }, autoCloseDuration);

    return () => {
      clearTimeout(timer);
    };
  }, [showToast, autoCloseDuration]);

  const triggerToast = useCallback((variant: ToastVariant, message: string) => {
    setToastVariant(variant);
    setToastMessage(message);
    setShowToast(true);
  }, []);

  const closeToast = useCallback(() => {
    setShowToast(false);
  }, []);

  return {
    showToast,
    toastVariant,
    toastMessage,
    triggerToast,
    closeToast,
  };
};
