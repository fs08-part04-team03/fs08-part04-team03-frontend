import {
  cloneElement,
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useState,
} from 'react';
import clsx from 'clsx';

export type TooltipProps = {
  content: ReactNode;
  children: ReactElement;
  disabled?: boolean;
  className?: string;
};

export const Tooltip = ({ content, children, disabled, className }: TooltipProps) => {
  const [open, setOpen] = useState(false);

  if (!isValidElement(children) || Children.count(children) !== 1) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Tooltip children은 반드시 하나의 ReactElement여야 합니다.');
    }
    return null;
  }

  // 트리거에 이벤트/aria를 주입하기 위해 cloneElement 사용
  const originalProps = children.props as Record<string, unknown>;
  const originalOnMouseEnter = originalProps.onMouseEnter as
    | ((event: React.MouseEvent) => void)
    | undefined;
  const originalOnMouseLeave = originalProps.onMouseLeave as
    | ((event: React.MouseEvent) => void)
    | undefined;
  const originalOnFocus = originalProps.onFocus as ((event: React.FocusEvent) => void) | undefined;
  const originalOnBlur = originalProps.onBlur as ((event: React.FocusEvent) => void) | undefined;

  const trigger = cloneElement(children, {
    ...originalProps,
    onMouseEnter: (event: React.MouseEvent) => {
      if (!disabled) setOpen(true);
      originalOnMouseEnter?.(event);
    },
    onMouseLeave: (event: React.MouseEvent) => {
      if (!disabled) setOpen(false);
      originalOnMouseLeave?.(event);
    },
    onFocus: (event: React.FocusEvent) => {
      if (!disabled) setOpen(true);
      originalOnFocus?.(event);
    },
    onBlur: (event: React.FocusEvent) => {
      if (!disabled) setOpen(false);
      originalOnBlur?.(event);
    },
    'aria-describedby': open ? 'tooltip' : undefined,
  } as typeof originalProps);

  return (
    <span className="relative inline-flex">
      {trigger}

      {open && !disabled && (
        <div
          className="pointer-events-none absolute left-[16%] top-full z-tooltip ml-30"
          style={{ marginTop: '-15px' }}
          role="tooltip"
          id="tooltip"
        >
          <div
            className={clsx(
              // 툴팁 박스 스타일
              'relative rounded-default w-270 h-105 text-12 leading-normal',
              'bg-gray-950 text-white shadow-lg',
              'px-24 py-24',
              className
            )}
            style={{ padding: '24px' }}
          >
            {content}
          </div>
        </div>
      )}
    </span>
  );
};
