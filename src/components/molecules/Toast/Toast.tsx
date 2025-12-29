'use client';

import Image from 'next/image';
import { clsx } from '@/utils/clsx';
import { IconButton } from '@/components/atoms/IconButton/IconButton';

export interface ToastProps {
  amount?: string;
  variant: 'error' | 'success' | 'custom';
  message?: string;
  onClose?: () => void;
}

/* --------------------------------
 * CloseButton 컴포넌트 (Toast 외부로 이동)
 * -------------------------------- */
const CloseButton = ({ onClose }: { onClose?: () => void }) => {
  if (!onClose) return null;

  return (
    <IconButton
      variant="filled"
      size="sm"
      onClick={onClose}
      className="bg-white hover:bg-white cursor-pointer ml-2"
    >
      <div className="relative w-24 h-24">
        <Image src="/icons/close-circle.svg" alt="close" fill />
      </div>
    </IconButton>
  );
};

/* --------------------------------
 * ToastContent (예산 표시 + Close 버튼)
 * -------------------------------- */
const ToastContent = ({
  variant,
  formattedAmount,
  onClose,
}: {
  variant: 'error' | 'success' | 'custom';
  formattedAmount: string;
  onClose?: () => void;
}) => {
  if (variant !== 'error') return <CloseButton onClose={onClose} />;

  return (
    <div className="flex items-center gap-2">
      <span className="font-suit font-bold text-20 leading-none tracking--0.35">남은 예산</span>
      <span className="font-suit font-bold text-20 leading-none tracking--0.35">
        {formattedAmount}
      </span>
      <CloseButton onClose={onClose} />
    </div>
  );
};

/* --------------------------------
 * Desktop Message
 * -------------------------------- */
const DesktopMessage = ({ message }: { message: string }) => (
  <span className="font-suit font-bold text-20 leading-none tracking--0.35">{message}</span>
);

/* --------------------------------
 * Tablet Message
 * -------------------------------- */
const TabletMessage = ({
  message,
  variant,
}: {
  message: string;
  variant: 'error' | 'success' | 'custom';
}) => {
  if (variant === 'error') {
    return (
      <span className="font-suit font-bold text-20 leading-none tracking--0.35">
        수량을 줄이거나 항목을 제거해주세요.
      </span>
    );
  }

  return <span className="font-suit font-bold text-20 leading-none tracking--0.35">{message}</span>;
};

/* --------------------------------
 * Mobile Message
 * -------------------------------- */
const MobileMessage = ({
  variant,
  message,
}: {
  variant: 'error' | 'success' | 'custom';
  message?: string;
}) => {
  if (variant === 'error') {
    return (
      <span>
        예산이 부족합니다.
        <br />
        수량을 줄이거나 항목을 제거해 주세요.
      </span>
    );
  }
  if (variant === 'custom') {
    return <span>{message || ''}</span>;
  }
  return <span>예산이 변경되었습니다.</span>;
};

/* =======================================================================
 * Toast 컴포넌트
 * ======================================================================= */
export const Toast = ({ amount = '0', variant, message, onClose }: ToastProps) => {
  /* variant별 아이콘/메시지 */
  let iconSrc = '';
  let defaultMessage = '';

  if (variant === 'error') {
    iconSrc = '/icons/red-info.svg';
    defaultMessage = '예산이 부족합니다. 수량을 줄이거나 항목을 제거해주세요.';
  } else if (variant === 'custom') {
    iconSrc = '/icons/check-icon.svg';
    defaultMessage = message || '';
  } else {
    iconSrc = '/icons/check-icon.svg';
    defaultMessage = '예산이 변경되었습니다.';
  }

  const finalMessage = message || defaultMessage;

  /* 금액 포맷 */
  let formattedAmount = '0원';
  const amountNumber = Number(amount);

  if (!Number.isNaN(amountNumber)) {
    formattedAmount = `${new Intl.NumberFormat('ko-KR').format(amountNumber)}원`;
  }

  return (
    <div
      role="status"
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
      className={clsx(
        'flex items-center text-white relative rounded-default bg-[rgba(0,0,0,0.80)] shadow-toast backdrop-blur-toast',
        'gap-8',
        'z-toast',

        /* --- 기기별 패딩 --- */
        'px-20', // 기본 (mobile fallback)
        'mobile:px-20', // 모바일 = 20px
        'tablet:px-toast-32', // 태블릿 = 기존 32px
        'desktop:px-50', // 데스크탑 = 50px

        /* --- 기기별 토스트 크기 적용 --- */
        'desktop:w-1152 desktop:h-80',
        'tablet:w-696 tablet:h-80',
        'mobile:w-350 mobile:h-64'
      )}
    >
      {/* 아이콘 */}
      <div className="flex-shrink-0 w-24 h-24 relative">
        <Image src={iconSrc} alt="toast-icon" fill />
      </div>

      {/* 메시지 영역 */}
      <div className="flex-1 flex flex-col justify-center ml-3">
        {/* Desktop */}
        <div className="desktop:flex tablet:hidden mobile:hidden justify-between items-center w-full">
          <DesktopMessage message={finalMessage} />
          <ToastContent variant={variant} formattedAmount={formattedAmount} onClose={onClose} />
        </div>

        {/* Tablet */}
        <div className="tablet:flex desktop:hidden mobile:hidden justify-between items-center w-full">
          <TabletMessage message={finalMessage} variant={variant} />
          <ToastContent variant={variant} formattedAmount={formattedAmount} onClose={onClose} />
        </div>

        {/* Mobile */}
        <div className="mobile:flex tablet:hidden desktop:hidden justify-between items-center w-full">
          <div className="flex flex-col font-suit font-bold text-14 leading-160 tracking--0.35">
            <MobileMessage variant={variant} message={finalMessage} />
          </div>
          <CloseButton onClose={onClose} />
        </div>
      </div>
    </div>
  );
};
