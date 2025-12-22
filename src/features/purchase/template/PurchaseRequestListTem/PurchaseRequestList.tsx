// 내 구매 요청 내역 - MyPurchaseRequestListPage [내가 요청한 내역들만 보이는곳, 유저, 메니저, 어드민]
// GET /api/v1/purchase/user/getMyPurchases

'use client';

import { useCallback, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { clsx } from '@/utils/clsx';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import StatusTag from '@/components/atoms/StatusTag/StatusTag';
import PriceText from '@/components/atoms/PriceText/PriceText';
import Button from '@/components/atoms/Button/Button';
import { Divider } from '@/components/atoms/Divider/Divider';
import PurchaseRequestItemListOrg from '@/features/purchase/components/PurchaseRequestItemListOrg/PurchaseRequestItemListOrg';
import DropDown, { type Option } from '@/components/atoms/DropDown/DropDown';
import PaginationBlock from '@/components/molecules/PaginationBlock/PaginationBlock';
import StatusNotice from '@/components/molecules/StatusNotice/StatusNotice';
import CustomModal from '@/components/molecules/CustomModal/CustomModal';
import {
  formatDate,
  formatItemDescription,
  getStatusTagVariant,
} from '@/features/purchase/utils/purchase.utils';

/**
 * PurchaseRequestList Props
 */
export interface PurchaseRequestListProps {
  purchaseList: PurchaseRequestItem[];
  className?: string;
  onCancel?: (purchaseRequestId: string) => void | Promise<void>;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  sortOptions?: Option[];
  selectedSortOption?: Option;
  onSortChange?: (sort: string | undefined) => void;
  statusOptions?: Option[];
  selectedStatusOption?: Option;
  onStatusChange?: (status: string | undefined) => void;
}

interface PurchaseRequestTableRowProps {
  item: PurchaseRequestItem;
  onCancel: (purchaseRequestId: string) => void | Promise<void>;
}

/**
 * 테이블 헤더 (태블릿)
 */
const PurchaseRequestTableHeaderTablet = () => (
  <div className={clsx('w-full')}>
    <div className={clsx('flex items-center', 'w-full', 'gap-16 tablet:gap-24 desktop:gap-32')}>
      <div
        className={clsx(
          'text-left',
          'text-gray-700',
          'text-14',
          'font-bold',
          'shrink-0',
          'tablet:w-100',
          'desktop:w-180',
          'py-20',
          'tablet:px-0',
          'desktop:px-40'
        )}
      >
        구매 요청일
      </div>
      <div
        className={clsx(
          'text-left',
          'text-gray-700',
          'text-14',
          'font-bold',
          'shrink-0',
          'tablet:w-140',
          'desktop:w-260',
          'py-20',
          'tablet:px-0',
          'desktop:px-40'
        )}
      >
        상품 정보
      </div>
      <div
        className={clsx(
          'text-left',
          'text-gray-700',
          'text-14',
          'font-bold',
          'shrink-0',
          'tablet:w-100',
          'desktop:w-180',
          'py-20',
          'tablet:px-0',
          'desktop:px-40'
        )}
      >
        주문 금액
      </div>
      <div
        className={clsx(
          'text-left',
          'text-gray-700',
          'text-14',
          'font-bold',
          'shrink-0',
          'tablet:w-100',
          'desktop:w-180',
          'py-20',
          'tablet:px-0',
          'desktop:px-40'
        )}
      >
        상태
      </div>
      <div
        className={clsx(
          'text-left',
          'text-gray-700',
          'text-14',
          'font-bold',
          'shrink-0',
          'tablet:w-100',
          'desktop:w-180',
          'py-20',
          'tablet:px-0',
          'desktop:px-40'
        )}
      >
        비고
      </div>
    </div>
  </div>
);

/**
 * 테이블 헤더 (데스크탑)
 */
const PurchaseRequestTableHeaderDesktop = ({
  sortOptions,
  selectedSortOption,
  onSortChange,
  statusOptions,
  selectedStatusOption,
  onStatusChange,
}: {
  sortOptions?: Option[];
  selectedSortOption?: Option;
  onSortChange?: (sort: string | undefined) => void;
  statusOptions?: Option[];
  selectedStatusOption?: Option;
  onStatusChange?: (status: string | undefined) => void;
}) => {
  const handleSortSelect = (option: Option) => {
    const sort = option.key === 'LATEST' ? undefined : option.key;
    onSortChange?.(sort);
  };

  const handleStatusSelect = (option: Option) => {
    const status = option.key === 'ALL' ? undefined : option.key;
    onStatusChange?.(status);
  };

  return (
    <div className={clsx('w-full')}>
      <div
        className={clsx(
          'flex items-center justify-between w-full',
          'text-left',
          'text-gray-700',
          'text-18',
          'font-bold',
          'py-20'
        )}
      >
        <p>구매 요청 내역</p>
        <div className={clsx('flex items-center gap-12')}>
          {statusOptions && (
            <div className="relative z-dropdown">
              <DropDown
                items={statusOptions}
                placeholder="전체"
                selected={selectedStatusOption}
                onSelect={handleStatusSelect}
              />
            </div>
          )}
          {sortOptions && (
            <div className="relative z-dropdown">
              <DropDown
                items={sortOptions}
                placeholder="최신순"
                selected={selectedSortOption}
                onSelect={handleSortSelect}
              />
            </div>
          )}
        </div>
      </div>
      <div className={clsx('flex items-center', 'w-full', 'gap-16 tablet:gap-24 desktop:gap-32')}>
        <div
          className={clsx(
            'text-left',
            'text-gray-700',
            'text-14',
            'font-bold',
            'shrink-0',
            'tablet:w-100',
            'desktop:w-180',
            'py-20',
            'tablet:px-0',
            'desktop:px-40'
          )}
        >
          구매 요청일
        </div>
        <div
          className={clsx(
            'text-left',
            'text-gray-700',
            'text-14',
            'font-bold',
            'shrink-0',
            'tablet:w-140',
            'desktop:w-260',
            'py-20',
            'tablet:px-0',
            'desktop:px-40'
          )}
        >
          상품 정보
        </div>
        <div
          className={clsx(
            'text-left',
            'text-gray-700',
            'text-14',
            'font-bold',
            'shrink-0',
            'tablet:w-100',
            'desktop:w-180',
            'py-20',
            'tablet:px-0',
            'desktop:px-40'
          )}
        >
          주문 금액
        </div>
        <div
          className={clsx(
            'text-left',
            'text-gray-700',
            'text-14',
            'font-bold',
            'shrink-0',
            'tablet:w-100',
            'desktop:w-180',
            'py-20',
            'tablet:px-0',
            'desktop:px-40'
          )}
        >
          상태
        </div>
        <div
          className={clsx(
            'text-left',
            'text-gray-700',
            'text-14',
            'font-bold',
            'shrink-0',
            'tablet:w-100',
            'desktop:w-180',
            'py-20',
            'tablet:px-0',
            'desktop:px-40'
          )}
        >
          비고
        </div>
      </div>
    </div>
  );
};

/**
 * 테이블 행 컴포넌트 (태블릿/데스크탑)
 */
const PurchaseRequestTableRowDesktop = ({
  item,
  onCancel,
  companyId,
}: PurchaseRequestTableRowProps & { companyId?: string }) => {
  const router = useRouter();
  const isPending = item.status === 'PENDING';
  const isUrgent = item.urgent === true;
  const totalPrice = item.totalPrice + item.shippingFee;

  const handleRowClick = () => {
    if (!companyId) return;
    router.push(`/${companyId}/my/purchase-requests/${item.id}`);
  };

  const handleRowKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleRowClick();
    }
  };

  const handleCancelClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // row 클릭 이벤트 전파 방지
    const result = onCancel(item.id);
    if (result instanceof Promise) {
      result.catch((error) => {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('구매 요청 취소 실패:', error);
        }
      });
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={clsx(
        'flex items-center',
        'w-full',
        'gap-16 tablet:gap-24 desktop:gap-32',
        isUrgent && 'bg-red-100',
        'cursor-pointer hover:bg-gray-50'
      )}
      onClick={handleRowClick}
      onKeyDown={handleRowKeyDown}
    >
      {/* 구매 요청일 */}
      <div
        className={clsx(
          'text-gray-700',
          'text-14',
          'font-bold',
          'shrink-0',
          'tablet:w-100',
          'desktop:w-180',
          'py-20',
          'tablet:px-0',
          'desktop:px-40'
        )}
      >
        {formatDate(item.createdAt)}
      </div>

      {/* 상품 정보 */}
      <div
        className={clsx(
          'text-gray-700',
          'text-14',
          'shrink-0',
          'tablet:w-140',
          'desktop:w-260',
          'min-w-0',
          'py-20',
          'tablet:px-0',
          'desktop:px-40'
        )}
      >
        {formatItemDescription(item.purchaseItems)}
      </div>

      {/* 주문 금액 */}
      <div
        className={clsx(
          'shrink-0',
          'text-left',
          'tablet:w-100',
          'desktop:w-180',
          'py-20',
          'tablet:px-0',
          'desktop:px-40'
        )}
      >
        <PriceText
          value={totalPrice}
          showUnit
          className={clsx('text-gray-700', 'text-14', 'font-normal')}
        />
      </div>

      {/* 상태 */}
      <div
        className={clsx(
          'shrink-0',
          'text-left',
          'tablet:w-100',
          'desktop:w-180',
          'py-20',
          'tablet:px-0',
          'desktop:px-40'
        )}
      >
        <StatusTag variant={getStatusTagVariant(item.status)} />
      </div>

      {/* 비고 */}
      {isPending && (
        <div
          className={clsx(
            'shrink-0',
            'text-left',
            'tablet:w-100',
            'desktop:w-180',
            'py-20',
            'tablet:px-0',
            'desktop:px-40'
          )}
        >
          <Button variant="secondary" onClick={handleCancelClick} className="w-126 h-44">
            요청 취소
          </Button>
        </div>
      )}
    </div>
  );
};

/**
 * 구매 요청 목록 테이블 컴포넌트
 */
const PurchaseRequestList = ({
  purchaseList,
  className,
  onCancel,
  currentPage,
  totalPages,
  onPageChange,
  sortOptions,
  selectedSortOption,
  onSortChange,
  statusOptions,
  selectedStatusOption,
  onStatusChange,
}: PurchaseRequestListProps) => {
  const router = useRouter();
  const params = useParams();
  const companyId = params?.companyId ? String(params.companyId) : undefined;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelTargetId, setCancelTargetId] = useState<string | null>(null);
  const [cancelTargetItem, setCancelTargetItem] = useState<PurchaseRequestItem | null>(null);

  const handleCancelClick = useCallback(
    (purchaseRequestId: string) => {
      const item = purchaseList.find((p) => p.id === purchaseRequestId);
      if (item) {
        setCancelTargetId(purchaseRequestId);
        setCancelTargetItem(item);
        setIsModalOpen(true);
      }
    },
    [purchaseList]
  );

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setCancelTargetId(null);
    setCancelTargetItem(null);
  }, []);

  const handleModalConfirm = useCallback(async () => {
    if (!cancelTargetId || !onCancel) return;

    try {
      await onCancel(cancelTargetId);
      setIsModalOpen(false);
      setCancelTargetId(null);
      setCancelTargetItem(null);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('구매 요청 취소 실패:', error);
      }
    }
  }, [cancelTargetId, onCancel]);

  const handleCancel = useCallback(
    (purchaseRequestId: string) => {
      handleCancelClick(purchaseRequestId);
    },
    [handleCancelClick]
  );

  const handleNavigateToProducts = useCallback(() => {
    if (!companyId) return;
    router.push(`/${companyId}/products`);
  }, [router, companyId]);

  if (purchaseList.length === 0) {
    return (
      <div className={clsx('w-full mt-200', 'flex justify-center', className)}>
        <StatusNotice
          title="구매 요청한 내역이 없어요"
          description={`상품 리스트를 둘러보고\n관리자에게 요청해보세요`}
          buttonText="상품 리스트로 이동"
          onButtonClick={handleNavigateToProducts}
        />
      </div>
    );
  }

  return (
    <div className={clsx('w-full', 'desktop:max-w-1400', 'desktop:mx-auto', className)}>
      {/* 모바일 레이아웃 - PurchaseRequestItemListOrg 재사용 */}
      <div className={clsx('tablet:hidden')}>
        <PurchaseRequestItemListOrg
          purchaseList={purchaseList}
          onCancel={handleCancel}
          companyId={companyId}
        />
      </div>

      {/* 태블릿/데스크탑 레이아웃 - 테이블 */}
      <div className={clsx('hidden tablet:block', 'overflow-x-auto')}>
        <div className={clsx('w-full')}>
          {/* 태블릿 헤더 */}
          <div className={clsx('hidden tablet:block desktop:hidden')}>
            <PurchaseRequestTableHeaderTablet />
          </div>

          {/* 데스크탑 헤더 */}
          <div className={clsx('hidden desktop:block')}>
            <PurchaseRequestTableHeaderDesktop
              sortOptions={sortOptions}
              selectedSortOption={selectedSortOption}
              onSortChange={onSortChange}
              statusOptions={statusOptions}
              selectedStatusOption={selectedStatusOption}
              onStatusChange={onStatusChange}
            />
          </div>

          {/* Divider */}
          <Divider variant="thin" className="w-full" />

          {/* 테이블 바디 */}
          <div className={clsx('w-full')}>
            {purchaseList.map((item) => (
              <PurchaseRequestTableRowDesktop
                key={item.id}
                item={item}
                onCancel={handleCancel}
                companyId={companyId}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 페이지네이션 */}
      {currentPage !== undefined && totalPages !== undefined && totalPages > 0 && onPageChange && (
        <div className={clsx('flex justify-start', 'mt-20')}>
          <PaginationBlock
            current={currentPage}
            total={totalPages}
            onPrev={onPageChange}
            onNext={onPageChange}
          />
        </div>
      )}

      {/* 취소 확인 모달 */}
      <CustomModal
        open={isModalOpen}
        type="cancel"
        productName={
          cancelTargetItem && cancelTargetItem.purchaseItems.length > 0
            ? cancelTargetItem.purchaseItems[0]?.products.name
            : undefined
        }
        cancelCount={
          cancelTargetItem && cancelTargetItem.purchaseItems.length > 1
            ? cancelTargetItem.purchaseItems.length - 1
            : 0
        }
        onClose={handleModalClose}
        onConfirm={() => {
          handleModalConfirm().catch(() => {
            // 에러는 handleModalConfirm 내부에서 처리됨
          });
        }}
      />
    </div>
  );
};

export default PurchaseRequestList;
