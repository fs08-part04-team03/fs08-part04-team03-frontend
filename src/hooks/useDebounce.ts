import { useState, useEffect } from 'react';

/**
 * Debounced value를 반환하는 hook
 * @param value 입력
 * @param delay 기다릴 시간 (ms)
 * @returns Debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  // delay만큼 기다렸다가 value를 반환 (debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
