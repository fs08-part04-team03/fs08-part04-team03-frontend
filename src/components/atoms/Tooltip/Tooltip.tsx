import type { ReactNode } from 'react';
import clsx from 'clsx';

export type TooltipProps = {
  content: ReactNode;
  children: ReactNode;
  className?: string;
};

export const Tooltip = ({ content, children, className }: TooltipProps) => (
  <div className="relative inline-flex group">
    {children}

    <div
      className={clsx(
        'absolute left-8 top-full mt-5',
        'hidden group-hover:flex',
        'flex-col justify-start items-start text-start gap-8',
        'w-260 h-130 p-24 rounded-4 bg-gray-950',
        'text-white',
        'pointer-events-none z-tooltip',
        className
      )}
      role="tooltip"
    >
      {content}
    </div>
  </div>
);
