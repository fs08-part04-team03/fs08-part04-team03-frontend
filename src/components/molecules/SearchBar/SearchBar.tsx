'use client';

import { useState, useEffect, useRef, type FormEvent } from 'react';
import Image from 'next/image';
import { clsx } from '@/utils/clsx';
import { useDebounce } from '@/hooks/useDebounce';
import Input, { type InputProps } from '@/components/atoms/Input/Input';
import { IconButton } from '@/components/atoms/IconButton/IconButton';

export interface SearchBarProps extends Omit<InputProps, 'onSearch'> {
  onSearch?: (query: string) => void;
  defaultValue?: string;
  // 입력 즉시 검색 여부 (enter/검색 버튼을 눌러야 검색하는지 여부)
  instant?: boolean;
  // debounce 지연 시간 (ms)
  debounceDelay?: number;
}

const SearchBar = ({
  onSearch,
  defaultValue = '',
  className,
  instant = false,
  debounceDelay = 300,
  ...inputProps
}: SearchBarProps) => {
  const [query, setQuery] = useState(String(defaultValue));
  const debouncedQuery = useDebounce(query, debounceDelay);

  const onSearchRef = useRef(onSearch);

  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  // defaultValue가 변경되면 내부 상태도 업데이트 (부모에서 초기화 등 제어할 때 필요)
  useEffect(() => {
    setQuery(String(defaultValue));
  }, [defaultValue]);

  // instant 모드일 경우 debounce 된 검색어로 자동 검색 실행
  useEffect(() => {
    if (instant && onSearchRef.current) {
      onSearchRef.current(debouncedQuery.trim());
    }
  }, [debouncedQuery, instant]);

  const handleSubmit = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (onSearch) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className={clsx('relative w-full', className)}>
      <div className="relative flex items-center">
        <div className="absolute left-1 bottom-10 z-20 drop-shadow-sm">
          <IconButton variant="default" size="md" aria-label="검색" onClick={() => handleSubmit()}>
            <Image src="/icons/search-icon.svg" alt="Search" width={24} height={24} unoptimized />
          </IconButton>
        </div>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="이름으로 검색하세요"
          className={clsx('pl-50 pr-16 border-gray-300 focus:border-gray-500', className)}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...inputProps}
        />
      </div>
    </form>
  );
};

export default SearchBar;
