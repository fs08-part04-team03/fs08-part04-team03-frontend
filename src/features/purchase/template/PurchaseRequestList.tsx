// 내 구매 요청 내역 - MyPurchaseRequestListPage
// GET /api/v1/purchase/user/getMyPurchases

'use client';

import { useCallback } from 'react';
import { useRouter, useParams, useSearchParams, usePathname } from 'next/navigation';
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
  onStatusChange,
  currentStatus,
}: {
  onStatusChange?: (status: string | undefined) => void;
  currentStatus?: string;
}) => {
  const statusOptions: Option[] = [
    { key: 'ALL', label: '전체' },
    { key: 'PENDING', label: '대기중' },
    { key: 'APPROVED', label: '승인됨' },
    { key: 'REJECTED', label: '반려됨' },
    { key: 'CANCELLED', label: '취소됨' },
  ];

  const selectedOption =
    currentStatus && currentStatus !== 'ALL'
      ? statusOptions.find((opt) => opt.key === currentStatus)
      : statusOptions.find((opt) => opt.key === 'ALL');

  const handleSelect = (option: Option) => {
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
        <DropDown
          items={statusOptions}
          placeholder="전체"
          selected={selectedOption}
          onSelect={handleSelect}
        />
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
const PurchaseRequestTableRowDesktop = ({ item, onCancel }: PurchaseRequestTableRowProps) => {
  const isPending = item.status === 'PENDING';
  const isUrgent = item.urgent === true;
  const totalPrice = item.totalPrice + item.shippingFee;

  const handleCancelClick = () => {
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
      className={clsx(
        'flex items-center',
        'w-full',
        'gap-16 tablet:gap-24 desktop:gap-32',
        isUrgent && 'bg-red-100'
      )}
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
  onStatusChange,
}: PurchaseRequestListProps) => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const companyId = params?.companyId as string;
  const currentStatus = searchParams.get('status') || undefined;

  const handleCancel = useCallback(
    async (purchaseRequestId: string) => {
      if (onCancel) {
        await onCancel(purchaseRequestId);
      }
    },
    [onCancel]
  );

  const handleNavigateToProducts = useCallback(() => {
    if (!companyId) return;
    router.push(`/${companyId}/products`);
  }, [router, companyId]);

  const handleStatusChange = useCallback(
    (status: string | undefined) => {
      if (onStatusChange) {
        onStatusChange(status);
      } else {
        // 기본 동작: URL 파라미터 업데이트
        const urlParams = new URLSearchParams(searchParams.toString());
        if (status) {
          urlParams.set('status', status);
        } else {
          urlParams.delete('status');
        }
        urlParams.set('page', '1'); // 상태 변경 시 첫 페이지로 이동
        router.push(`${pathname}?${urlParams.toString()}`);
      }
    },
    [onStatusChange, searchParams, pathname, router]
  );

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
    <div className={clsx('w-full', 'desktop:max-w-1352', 'desktop:mx-auto', className)}>
      {/* 모바일 레이아웃 - PurchaseRequestItemListOrg 재사용 */}
      <div className={clsx('tablet:hidden')}>
        <PurchaseRequestItemListOrg purchaseList={purchaseList} onCancel={handleCancel} />
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
              onStatusChange={handleStatusChange}
              currentStatus={currentStatus}
            />
          </div>

          {/* Divider */}
          <Divider variant="thin" className="w-full" />

          {/* 테이블 바디 */}
          <div className={clsx('w-full')}>
            {purchaseList.map((item) => (
              <PurchaseRequestTableRowDesktop key={item.id} item={item} onCancel={handleCancel} />
            ))}
          </div>
        </div>
      </div>

      {/* 페이지네이션 */}
      {currentPage !== undefined && totalPages !== undefined && totalPages > 0 && onPageChange && (
        <div className={clsx('flex justify-center', 'mt-40')}>
          <PaginationBlock
            current={currentPage}
            total={totalPages}
            onPrev={onPageChange}
            onNext={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default PurchaseRequestList;
