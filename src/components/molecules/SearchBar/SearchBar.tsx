'use client';

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import { clsx } from '@/utils/clsx';
import Input, { type InputProps } from '@/components/atoms/Input/Input';
import { IconButton } from '@/components/atoms/IconButton/IconButton';

export interface SearchBarProps extends Omit<InputProps, 'onSearch'> {
  onSearch?: (query: string) => void;
  defaultValue?: string;
}

const SearchBar = ({ onSearch, defaultValue = '', className, ...inputProps }: SearchBarProps) => {
  const [query, setQuery] = useState(String(defaultValue));

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
          <IconButton type="submit" variant="default" size="md" aria-label="검색">
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
