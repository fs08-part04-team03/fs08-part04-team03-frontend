'use client';

import type { ReactNode } from 'react';
import { clsx } from '@/utils/clsx';

const INPUT_ICON_SRC = '/icons/eye-off.svg';

type InputVariant = 'normal' | 'typing' | 'disable' | 'completed' | 'error';

const bodyClass =
  "font-['SUIT'] text-[16px] font-normal leading-none tracking-[-0.4px]";
const captionClass =
  "font-['SUIT'] text-[12px] font-normal leading-none tracking-[-0.3px]";
const helperClass =
  "font-['SUIT'] text-[14px] font-normal leading-none tracking-[-0.35px]";

interface InputIconProps {
  alt?: string;
  className?: string;
}

const InputIcon = ({ alt = '입력 상태 아이콘', className }: InputIconProps) => (
  <img
    src={INPUT_ICON_SRC}
    alt={alt}
    className={clsx('w-4 h-4 bg-[#555] rounded-sm object-contain', className)}
  />
);

export interface InputProps {
  variant?: InputVariant;
  label?: string;
  value?: string;
  text?: string;
  errorMessage?: string;
  showIcon?: boolean;
  icon?: ReactNode;
  className?: string;
}

const variantDefaults: Record<InputVariant, Required<Pick<InputProps, 'showIcon'>> & Partial<InputProps>> = {
  normal: { showIcon: true, text: '비밀번호 입력' },
  typing: { showIcon: true, label: '비밀번호', value: 'hongseungjeon' },
  disable: { showIcon: false, label: '비밀번호', value: '********' },
  completed: { showIcon: true, label: '비밀번호', value: '********' },
  error: {
    showIcon: true,
    label: '비밀번호',
    value: 'hongseungjeon',
    errorMessage: '비밀번호를 다시 확인해 주세요.',
  },
};

const renderNormal = ({ text, showIcon, icon, className }: Required<Pick<InputProps, 'text' | 'showIcon'>> &
  Pick<InputProps, 'icon' | 'className'>) => (
  <div
    className={clsx(
      'flex w-[212px] h-[56px] px-1 py-2 items-center justify-between border-b border-[#696969]',
      className
    )}
  >
    <span className={clsx(bodyClass, 'text-[#878787]')}>{text}</span>
    {showIcon && (icon ?? <InputIcon />)}
  </div>
);

const renderTyping = ({
  label,
  value,
  showIcon,
  icon,
  className,
}: Required<Pick<InputProps, 'label' | 'value' | 'showIcon'>> &
  Pick<InputProps, 'icon' | 'className'>) => (
  <div
    className={clsx(
      'flex w-[212px] h-[56px] px-1 py-2 items-end gap-1 border-b border-[#222]',
      className
    )}
  >
    <div className="flex flex-col flex-1 gap-1">
      <span className={clsx(captionClass, 'text-[#696969]')}>{label}</span>
      <span className={clsx(bodyClass, 'text-[#222]')}>{value}</span>
    </div>
    {showIcon && (icon ?? <InputIcon />)}
  </div>
);

const renderDisable = ({
  label,
  value,
  className,
}: Required<Pick<InputProps, 'label' | 'value'>> & Pick<InputProps, 'className'>) => (
  <div
    className={clsx(
      'flex flex-col w-[212px] h-[56px] px-1 py-2 justify-between items-center border-b border-[#D1D1D1]',
      className
    )}
  >
    <span className={clsx(captionClass, 'w-full text-left text-[#878787]')}>{label}</span>
    <span className={clsx(bodyClass, 'w-full text-left text-[#B3B3B3]')}>{value}</span>
  </div>
);

const renderCompleted = ({
  label,
  value,
  showIcon,
  icon,
  className,
}: Required<Pick<InputProps, 'label' | 'value' | 'showIcon'>> &
  Pick<InputProps, 'icon' | 'className'>) => (
  <div
    className={clsx(
      'flex w-[212px] h-[56px] px-1 py-2 items-end gap-1 border-b border-[#696969]',
      className
    )}
  >
    <div className="flex flex-col flex-1 gap-1">
      <span className={clsx(captionClass, 'text-[#9E9E9E]')}>{label}</span>
      <span className={clsx(bodyClass, 'text-[#555]')}>{value}</span>
    </div>
    {showIcon && (icon ?? <InputIcon className="bg-[#878787]" alt="입력 완료 아이콘" />)}
  </div>
);

const renderError = ({
  label,
  value,
  showIcon,
  errorMessage,
  icon,
  className,
}: Required<Pick<InputProps, 'label' | 'value' | 'showIcon' | 'errorMessage'>> &
  Pick<InputProps, 'icon' | 'className'>) => (
  <div className={clsx('flex flex-col w-[212px] gap-1', className)}>
    <div className="flex w-full items-center gap-1 border-b border-[#F31D1D] pb-2">
      <div className="flex flex-1 flex-col gap-1">
        <span className={clsx(captionClass, 'text-[#696969]')}>{label}</span>
        <span className={clsx(bodyClass, 'text-[#222]')}>{value}</span>
      </div>
      {showIcon && (icon ?? <InputIcon />)}
    </div>
    <span
      className={clsx(helperClass, 'text-[#F31D1D] px-2 py-1 rounded-sm')}
      style={{ backgroundColor: 'var(--error, #F31D1D)' }}
    >
      {errorMessage}
    </span>
  </div>
);

const variantRenderer: Record<InputVariant, (props: InputProps) => JSX.Element> = {
  normal: (props) =>
    renderNormal({
      text: props.text ?? variantDefaults.normal.text!,
      showIcon: props.showIcon ?? variantDefaults.normal.showIcon,
      icon: props.icon,
      className: props.className,
    }),
  typing: (props) =>
    renderTyping({
      label: props.label ?? variantDefaults.typing.label!,
      value: props.value ?? variantDefaults.typing.value!,
      showIcon: props.showIcon ?? variantDefaults.typing.showIcon,
      icon: props.icon,
      className: props.className,
    }),
  disable: (props) =>
    renderDisable({
      label: props.label ?? variantDefaults.disable.label!,
      value: props.value ?? variantDefaults.disable.value!,
      className: props.className,
    }),
  completed: (props) =>
    renderCompleted({
      label: props.label ?? variantDefaults.completed.label!,
      value: props.value ?? variantDefaults.completed.value!,
      showIcon: props.showIcon ?? variantDefaults.completed.showIcon,
      icon: props.icon,
      className: props.className,
    }),
  error: (props) =>
    renderError({
      label: props.label ?? variantDefaults.error.label!,
      value: props.value ?? variantDefaults.error.value!,
      showIcon: props.showIcon ?? variantDefaults.error.showIcon,
      errorMessage: props.errorMessage ?? variantDefaults.error.errorMessage!,
      icon: props.icon,
      className: props.className,
    }),
};

const Input = ({ variant = 'normal', ...restProps }: InputProps) => variantRenderer[variant](restProps);

export default Input;

export const InputNormal = (props: Omit<InputProps, 'variant'>) => <Input variant="normal" {...props} />;
export const InputTyping = (props: Omit<InputProps, 'variant'>) => <Input variant="typing" {...props} />;
export const InputDisable = (props: Omit<InputProps, 'variant'>) => <Input variant="disable" {...props} />;
export const InputCompleted = (props: Omit<InputProps, 'variant'>) => <Input variant="completed" {...props} />;
export const InputError = (props: Omit<InputProps, 'variant'>) => <Input variant="error" {...props} />;

