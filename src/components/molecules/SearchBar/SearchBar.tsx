'use client';

import { useState, useEffect, type FormEvent } from 'react';
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

  // instant 모드일 경우 debounce 된 검색어로 자동 검색 실행
  useEffect(() => {
    if (instant && onSearch) {
      onSearch(debouncedQuery.trim());
    }
  }, [debouncedQuery, instant, onSearch]);

  const handleSubmit = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className={clsx('relative w-full', className)}>
      <div className="relative flex items-center">
        <div className="absolute left-1 bottom-10 z-10">
          <IconButton variant="default" size="md" aria-label="검색" onClick={() => handleSubmit()}>
            <Image src="/icons/search-icon.svg" alt="Search" width={24} height={24} />
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
