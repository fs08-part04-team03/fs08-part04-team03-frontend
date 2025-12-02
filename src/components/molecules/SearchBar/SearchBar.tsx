'use client';

import { useState, type FormEvent, type KeyboardEvent, type InputHTMLAttributes } from 'react';
import Image from 'next/image';
import { clsx } from '@/utils/clsx';
import { IconButton } from '@/components/atoms/IconButton/IconButton';

export interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onSearch'> {
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
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="이름으로 검색하세요"
          className={clsx(
            'w-full h-56 pl-50 pr-16 border-b border-gray-300',
            'font-sans font-normal text-16 tracking--0.4 text-gray-950',
            'placeholder:text-gray-500',
            'focus:outline-none focus:border-gray-500',
            'bg-transparent'
          )}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...inputProps}
        />
      </div>
    </form>
  );
};

export default SearchBar;
