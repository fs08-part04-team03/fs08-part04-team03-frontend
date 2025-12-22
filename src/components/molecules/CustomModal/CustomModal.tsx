'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Button from '@/components/atoms/Button/Button';
import { clsx } from '@/utils/clsx';

type ModalType = 'delete' | 'cancel' | 'approved' | 'rejected';

interface CustomModalProps {
  open: boolean;
  productName?: string;
  cancelCount?: number;
  type: ModalType;
  onClose: () => void;
  onConfirm?: () => void;
  onHome?: () => void;
  onOrder?: () => void;
}

const CustomModal = ({
  open,
  productName,
  cancelCount = 0,
  type,
  onClose,
  onConfirm,
  onHome,
  onOrder,
}: CustomModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  const handleDimmedClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!open) return null;

  const modalContent = {
    delete: {
      title: '상품을 삭제하시겠어요?',
      description: '삭제 후에는 복구할 수 없습니다.',
      buttonLeft: '더 생각해볼게요',
      buttonRight: '상품 삭제',
      icon: '/icons/blue-x.svg',
    },
    cancel: {
      title: '구매 요청을 취소하시겠어요?',
      description: '구매 요청 취소 후에는 복구할 수 없습니다.',
      buttonLeft: '더 생각해볼게요',
      buttonRight: '요청 취소',
      icon: '/icons/red-x.svg',
    },
    approved: {
      title: '승인 완료',
      description: '승인이 완료되었어요!\n구매 내역을 통해 배송 현황을 확인해보세요.',
      buttonLeft: '홈으로',
      buttonRight: '구매 내역 보기',
      icon: '/icons/red-i.svg',
    },
    rejected: {
      title: '요청 반려',
      description: '요청이 반려되었어요!\n목록에서 다른 요청을 확인해보세요.',
      buttonLeft: '홈으로',
      buttonRight: '구매 요청 내역 보기',
      icon: '/icons/red-i.svg',
    },
  };

  const content = modalContent[type];

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50 flex items-center justify-center',
        'bg-black/50 backdrop-blur-sm'
      )}
      role="dialog"
      aria-modal="true"
    >
      {/* ⭐ 중요한 수정: dimmed 영역을 실제 interactive 요소로 만듦 */}
      <div
        role="button"
        tabIndex={0}
        aria-label="모달 닫기"
        className="absolute inset-0"
        onClick={handleDimmedClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onClose();
        }}
      />

      {/* ⭐ 모달 컨테이너: 클릭 이벤트 있어 role="presentation" 부여 */}
      <div
        ref={modalRef}
        role="presentation"
        className={clsx(
          'relative bg-white rounded-20 w-327 h-auto p-20 flex flex-col items-center',
          'tablet:w-512 tablet:h-auto tablet:p-30',
          'desktop:w-512 desktop:h-auto desktop:p-30'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* approved / rejected */}
        {type === 'approved' || type === 'rejected' ? (
          <div className="flex flex-col items-center gap-5 mb-36">
            <h2 className={clsx('text-16 text-center tablet:text-18 desktop:text-18', 'font-bold')}>
              {content.title}
            </h2>

            <div className="hidden tablet:flex items-center justify-center w-20 h-20 my-8">
              <Image src={content.icon} alt="아이콘" width={20} height={20} />
            </div>

            <p className="text-14 text-gray-700 text-center tablet:text-16 desktop:text-16 whitespace-pre-line">
              {content.description}
            </p>
          </div>
        ) : (
          <>
            <h2
              className={clsx(
                'text-16 text-center tablet:text-18 desktop:text-18',
                'font-extrabold'
              )}
            >
              {content.title}
            </h2>

            <p className="text-14 text-gray-700 mt-8 mb-20 text-center tablet:text-16 tablet:mb-30 desktop:text-16 desktop:mb-30">
              {content.description}
            </p>

            <div className="flex items-center gap-8 mb-36">
              <div className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded-full">
                <Image src={content.icon} alt="아이콘" width={20} height={20} />
              </div>
              <span
                className={clsx(
                  'text-14 font-suit tablet:text-16 desktop:text-16',
                  type === 'cancel' ? 'font-extrabold' : 'font-normal'
                )}
              >
                {(() => {
                  if (type === 'cancel' && cancelCount > 0) {
                    return `${productName} 외 ${cancelCount}건`;
                  }
                  return productName;
                })()}
              </span>
            </div>
          </>
        )}

        <div className="flex gap-10 tablet:gap-20 desktop:gap-20">
          <Button
            variant="secondary"
            className={clsx(
              'w-139 h-50 rounded-none border-r border-gray-200 cursor-pointer text-14',
              'tablet:w-216 tablet:h-64 tablet:text-16',
              'desktop:w-216 desktop:h-64 desktop:text-16'
            )}
            onClick={onClose}
          >
            {content.buttonLeft}
          </Button>

          <Button
            variant="primary"
            className={clsx(
              'w-139 h-50 rounded-none cursor-pointer text-14',
              type === 'rejected' ? 'p-0 whitespace-nowrap' : '',
              'tablet:w-216 tablet:h-64 tablet:text-16',
              'desktop:w-216 desktop:h-64 desktop:text-16'
            )}
            onClick={type === 'approved' || type === 'rejected' ? onOrder || onHome : onConfirm}
          >
            {content.buttonRight}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
