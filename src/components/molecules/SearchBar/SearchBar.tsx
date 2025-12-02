'use client';

import { useState, type FormEvent, type KeyboardEvent } from 'react';
import Image from 'next/image';
import { clsx } from '@/utils/clsx';
import Input, { type InputProps } from '@/components/atoms/Input/Input';
import { IconButton } from '@/components/atoms/IconButton/IconButton';

export interface SearchBarProps extends Omit<InputProps, 'onSearch'> {
  onSearch?: (query: string) => void;
}

const SearchBar = ({ onSearch, defaultValue = '', className, ...inputProps }: SearchBarProps) => {
  const [query, setQuery] = useState(String(defaultValue));

  const handleSubmit = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch && query.trim()) {
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
          onKeyDown={handleKeyDown}
          placeholder="이름으로 검색하세요"
          className="pl-50"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...inputProps}
        />
      </div>
    </form>
  );
};

export default SearchBar;
