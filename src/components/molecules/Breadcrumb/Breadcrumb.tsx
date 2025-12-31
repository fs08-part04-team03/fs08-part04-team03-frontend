'use client';

import Link from 'next/link';
import { clsx } from '@/utils/clsx';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb = ({ items, className }: BreadcrumbProps) => (
  <nav aria-label="Breadcrumb" className={clsx('flex items-center', className)}>
    <ol className="flex items-center gap-8">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <li key={`${item.href ?? ''}-${item.label}`} className="flex items-center gap-8">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className={clsx(
                  'text-14 tablet:text-16 font-normal',
                  'text-gray-400 hover:text-gray-600',
                  'transition-colors'
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={clsx(
                  'text-14 tablet:text-16 font-normal',
                  isLast ? 'text-gray-900' : 'text-gray-200'
                )}
                aria-current={isLast ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}

            {!isLast && (
              <svg
                width="8"
                height="9"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="text-gray-200"
              >
                <path
                  d="M1.06055 0L7.95508 6.89355L1.06055 13.7881L0 12.7275L5.83301 6.89453L0 1.06055L1.06055 0Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Breadcrumb;
