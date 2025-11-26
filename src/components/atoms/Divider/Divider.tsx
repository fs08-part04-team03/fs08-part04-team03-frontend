import clsx from 'clsx';

type DividerVariant = 'thin' | 'thick';

type DividerProps = {
  orientation?: 'horizontal' | 'vertical';
  variant?: DividerVariant;
  className?: string;
};

const variantClass: Record<DividerVariant, string> = {
  thin: 'bg-gray-100',
  thick: 'bg-gray-950',
};

const thicknessClass: Record<DividerVariant, string> = {
  thin: 'h-px',
  thick: 'h-0.5',
};

export const Divider = ({
  orientation = 'horizontal',
  variant = 'thin',
  className,
}: DividerProps) => (
  <div
    role="separator"
    className={clsx(
      variantClass[variant],
      orientation === 'horizontal'
        ? `w-full ${thicknessClass[variant]}`
        : `h-full ${variant === 'thin' ? 'w-px' : 'w-0.5'}`,
      className
    )}
  />
);
