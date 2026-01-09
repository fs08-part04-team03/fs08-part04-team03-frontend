// 내 구매 요청 내역 - MyPurchaseRequestListPage
// GET /api/v1/purchase/user/getMyPurchases

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { clsx } from '@/utils/clsx';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import PriceText from '@/components/atoms/PriceText/PriceText';
import Button from '@/components/atoms/Button/Button';
import StatusTag from '@/components/atoms/StatusTag/StatusTag';
import {
  formatDate,
  formatItemDescription,
  getStatusTagVariant,
} from '@/features/purchase/utils/purchase.utils';
import { logger } from '@/utils/logger';

/**
 * PurchaseRequestItemListOrg Props
 */
export interface PurchaseRequestItemListOrgProps {
  purchaseList: PurchaseRequestItem[];
  className?: string;
  onReject?: (purchaseRequestId: string) => void;
  onApprove?: (purchaseRequestId: string) => void;
  onCancel?: (purchaseRequestId: string) => void;
  onRowClick?: (purchaseRequestId: string) => void;
  companyId?: string;
}

interface PurchaseRequestItemRowProps {
  item: PurchaseRequestItem;
  onReject?: (purchaseRequestId: string) => void;
  onApprove?: (purchaseRequestId: string) => void;
  onCancel?: (purchaseRequestId: string) => void;
  onRowClick?: (purchaseRequestId: string) => void;
  companyId?: string;
}

/**
 * 모바일 레이아웃 아이템 행
 */
const PurchaseRequestItemRowMobile = ({
  item,
  onReject,
  onApprove,
  onCancel,
  onRowClick,
  companyId,
}: PurchaseRequestItemRowProps) => {
  const router = useRouter();
  const isPending = item.status === 'PENDING';
  const isUrgent = item.urgent === true;
  const totalPrice = (item.itemsTotalPrice ?? item.totalPrice ?? 0) + item.shippingFee;

  const handleRowClick = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (onRowClick) {
      onRowClick(item.id);
    } else if (companyId) {
      // 기본값: 사용자용 경로 (onRowClick이 없을 때만)
      router.push(`/${companyId}/my/purchase-requests/${item.id}`);
    } else {
      logger.warn('companyId가 없어서 이동할 수 없습니다.');
    }
  };

  const handleRowKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      if (onRowClick) {
        onRowClick(item.id);
      } else if (companyId) {
        router.push(`/${companyId}/my/purchase-requests/${item.id}`);
      } else {
        logger.warn('companyId가 없어서 이동할 수 없습니다.');
      }
    }
  };

  const handleRejectClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // row 클릭 이벤트 전파 방지
    if (!onReject) return;
    onReject(item.id);
  };

  const handleApproveClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // row 클릭 이벤트 전파 방지
    if (!onApprove) return;
    onApprove(item.id);
  };

  const handleCancelClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // row 클릭 이벤트 전파 방지
    if (!onCancel) return;
    onCancel(item.id);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={clsx(
        'flex flex-col',
        'w-full',
        'py-16',
        'border-b border-gray-200',
        'gap-12',
        isUrgent && 'bg-red-100',
        'cursor-pointer hover:bg-gray-50'
      )}
      onClick={(e) => handleRowClick(e)}
      onKeyDown={handleRowKeyDown}
    >
      {/* 첫 번째 줄: 2개 컬럼 (왼쪽: 날짜/제목/금액, 오른쪽: 상태) */}
      <div className={clsx('flex items-start', 'w-full', 'gap-12')}>
        {/* 왼쪽 컬럼: 날짜, 제목, 금액 */}
        <div className={clsx('flex flex-col', 'flex-1', 'min-w-0', 'gap-4')}>
          {/* 날짜 */}
          <div className={clsx('text-gray-700', 'text-14', 'font-bold')}>
            {formatDate(item.createdAt)}
          </div>

          {/* 아이템 설명 - 클릭 가능 */}
          <div
            className={clsx(
              'text-gray-700',
              'text-14',
              'cursor-pointer',
              'hover:underline',
              'hover:text-primary-500'
            )}
            onClick={(e) => {
              e.stopPropagation(); // row 클릭 이벤트 전파 방지
              if (
                companyId &&
                item.purchaseItems.length > 0 &&
                item.purchaseItems[0]?.products.id
              ) {
                router.push(`/${companyId}/products/${item.purchaseItems[0].products.id}`);
              }
            }}
            onKeyDown={(e) => {
              if (
                (e.key === 'Enter' || e.key === ' ') &&
                companyId &&
                item.purchaseItems.length > 0 &&
                item.purchaseItems[0]?.products.id
              ) {
                e.preventDefault();
                e.stopPropagation();
                router.push(`/${companyId}/products/${item.purchaseItems[0].products.id}`);
              }
            }}
            role="button"
            tabIndex={0}
          >
            {formatItemDescription(item.purchaseItems)}
          </div>

          {/* 가격 (모바일에서는 원 포함) */}
          <div>
            <PriceText
              value={totalPrice}
              showUnit
              className={clsx('text-gray-700', 'text-14', 'font-normal')}
            />
          </div>
        </div>

        {/* 오른쪽 컬럼: 상태 태그 */}
        <div className={clsx('shrink-0', 'flex', 'items-start')}>
          <StatusTag variant={getStatusTagVariant(item.status)} />
        </div>
      </div>

      {/* 두 번째 줄 (반려/승인 버튼 또는 취소 버튼 - 대기중일 때만) */}
      {isPending && (
        <>
          {onReject && onApprove && (
            <div className={clsx('w-full', 'flex gap-8')}>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleRejectClick}
                className="flex-1 h-40 tablet:w-auto tablet:h-44 text-10!"
              >
                반려
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleApproveClick}
                className="flex-1 h-40 tablet:w-auto tablet:h-44 text-10!"
              >
                승인
              </Button>
            </div>
          )}
          {onCancel && (
            <div className={clsx('w-full', 'flex gap-8')}>
              <Button
                variant="secondary"
                onClick={handleCancelClick}
                className="flex-1 h-40 tablet:w-auto tablet:h-44"
              >
                요청 취소
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

/**
 * 태블릿/데스크탑 레이아웃 아이템 행
 */
const PurchaseRequestItemRowDesktop = ({
  item,
  onReject,
  onApprove,
  onCancel,
  onRowClick,
  companyId,
}: PurchaseRequestItemRowProps) => {
  const router = useRouter();
  const isPending = item.status === 'PENDING';
  const isUrgent = item.urgent === true;
  const totalPrice = (item.itemsTotalPrice ?? item.totalPrice ?? 0) + item.shippingFee;

  const handleRowClick = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (onRowClick) {
      onRowClick(item.id);
    } else if (companyId) {
      // 기본값: 사용자용 경로 (onRowClick이 없을 때만)
      router.push(`/${companyId}/my/purchase-requests/${item.id}`);
    } else {
      logger.warn('companyId가 없어서 이동할 수 없습니다.');
    }
  };

  const handleRowKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      if (onRowClick) {
        onRowClick(item.id);
      } else if (companyId) {
        router.push(`/${companyId}/my/purchase-requests/${item.id}`);
      } else {
        logger.warn('companyId가 없어서 이동할 수 없습니다.');
      }
    }
  };

  const handleRejectClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // row 클릭 이벤트 전파 방지
    if (!onReject) return;
    onReject(item.id);
  };

  const handleApproveClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // row 클릭 이벤트 전파 방지
    if (!onApprove) return;
    onApprove(item.id);
  };

  const handleCancelClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // row 클릭 이벤트 전파 방지
    if (!onCancel) return;
    onCancel(item.id);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={clsx(
        'flex items-center',
        'w-full',
        'border-b border-gray-200',
        'gap-16 tablet:gap-24 desktop:gap-32',
        isUrgent && 'bg-red-100',
        'cursor-pointer hover:bg-gray-50'
      )}
      onClick={(e) => handleRowClick(e)}
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

      {/* 상품 정보 - 클릭 가능 */}
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
          'desktop:px-40',
          'cursor-pointer',
          'hover:underline',
          'hover:text-primary-500'
        )}
        onClick={(e) => {
          e.stopPropagation(); // row 클릭 이벤트 전파 방지
          if (companyId && item.purchaseItems.length > 0 && item.purchaseItems[0]?.products.id) {
            router.push(`/${companyId}/products/${item.purchaseItems[0].products.id}`);
          }
        }}
        onKeyDown={(e) => {
          if (
            (e.key === 'Enter' || e.key === ' ') &&
            companyId &&
            item.purchaseItems.length > 0 &&
            item.purchaseItems[0]?.products.id
          ) {
            e.preventDefault();
            e.stopPropagation();
            router.push(`/${companyId}/products/${item.purchaseItems[0].products.id}`);
          }
        }}
        role="button"
        tabIndex={0}
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

      {/* 비고 */}
      {isPending && (
        <>
          {onReject && onApprove && (
            <div
              className={clsx(
                'shrink-0',
                'text-left',
                'tablet:w-100',
                'desktop:w-180',
                'py-20',
                'tablet:px-0',
                'desktop:px-40',
                'flex gap-8'
              )}
            >
              <Button variant="secondary" size="sm" onClick={handleRejectClick} className="">
                반려
              </Button>
              <Button variant="primary" size="sm" onClick={handleApproveClick} className="">
                승인
              </Button>
            </div>
          )}
          {onCancel && (
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
              <Button variant="secondary" onClick={handleCancelClick} className="h-44 w-126">
                요청 취소
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

/**
 * 구매 요청 아이템 리스트 컴포넌트
 */
const PurchaseRequestItemListOrg = ({
  purchaseList,
  className,
  onReject,
  onApprove,
  onCancel,
  onRowClick,
  companyId,
}: PurchaseRequestItemListOrgProps) => (
  <div className={clsx('w-full', className)}>
    {purchaseList.map((item) => (
      <React.Fragment key={item.id}>
        {/* 모바일 레이아웃 */}
        <div className={clsx('tablet:hidden')}>
          <PurchaseRequestItemRowMobile
            item={item}
            onReject={onReject}
            onApprove={onApprove}
            onCancel={onCancel}
            onRowClick={onRowClick}
            companyId={companyId}
          />
        </div>

        {/* 태블릿/데스크탑 레이아웃 */}
        <div className={clsx('hidden tablet:block')}>
          <PurchaseRequestItemRowDesktop
            item={item}
            onReject={onReject}
            onApprove={onApprove}
            onCancel={onCancel}
            onRowClick={onRowClick}
            companyId={companyId}
          />
        </div>
      </React.Fragment>
    ))}
  </div>
);

export default PurchaseRequestItemListOrg;
