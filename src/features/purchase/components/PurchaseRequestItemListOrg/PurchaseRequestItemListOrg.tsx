// 내 구매 요청 내역 - MyPurchaseRequestListPage
// GET /api/v1/purchase/admin/managePurchaseRequests

'use client';

import React, { useCallback } from 'react';
import { clsx } from '@/utils/clsx';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import StatusTag, { type StatusTagVariant } from '@/components/atoms/StatusTag/StatusTag';
import PriceText from '@/components/atoms/PriceText/PriceText';
import { cancelPurchaseRequest } from '@/features/purchase/api/purchase.api';
import Button from '@/components/atoms/Button/Button';

/**
 * 날짜를 한국 형식으로 포맷팅 (YYYY. MM. DD)
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}. ${month}. ${day}`;
}

/**
 * 구매 아이템 목록에서 첫 번째 아이템 이름과 나머지 개수 반환
 */
function formatItemDescription(purchaseItems: PurchaseRequestItem['purchaseItems']): string {
  if (purchaseItems.length === 0) return '';
  const firstItem = purchaseItems[0];
  if (!firstItem) return '';
  if (purchaseItems.length === 1) return firstItem.products.name;
  const firstItemName = firstItem.products.name;
  const remainingCount = purchaseItems.length - 1;
  return `${firstItemName} 외 ${remainingCount}건`;
}

/**
 * 상태에 따른 StatusTag variant 반환
 */
function getStatusTagVariant(status: PurchaseRequestItem['status']): StatusTagVariant {
  if (status === 'APPROVED') {
    return 'approved';
  }
  if (status === 'REJECTED') {
    return 'rejected';
  }
  if (status === 'PENDING') {
    return 'pending';
  }
  if (status === 'CANCELLED') {
    return 'pending'; // TODO: CANCELLED 상태에 대한 별도 variant 추가 시 수정
  }
  return 'pending';
}

/**
 * PurchaseRequestItemListOrg Props
 */
export interface PurchaseRequestItemListOrgProps {
  purchaseList: PurchaseRequestItem[];
  className?: string;
  onCancel?: (purchaseRequestId: string) => void | Promise<void>;
}

interface PurchaseRequestItemRowProps {
  item: PurchaseRequestItem;
  onCancel: (purchaseRequestId: string) => void | Promise<void>;
}

/**
 * 모바일 레이아웃 아이템 행
 */
const PurchaseRequestItemRowMobile: React.FC<PurchaseRequestItemRowProps> = ({
  item,
  onCancel,
}) => {
  const isPending = item.status === 'PENDING';
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
    <div className={clsx('flex flex-col', 'w-full', 'py-16', 'border-b border-gray-200', 'gap-12')}>
      {/* 첫 번째 줄: 2개 컬럼 (왼쪽: 날짜/제목/금액, 오른쪽: 태그) */}
      <div className={clsx('flex items-start', 'w-full', 'gap-12')}>
        {/* 왼쪽 컬럼: 날짜, 제목, 금액 */}
        <div className={clsx('flex flex-col', 'flex-1', 'min-w-0', 'gap-4')}>
          {/* 날짜 */}
          <div className={clsx('text-gray-700', 'text-14', 'font-bold')}>
            {formatDate(item.createdAt)}
          </div>

          {/* 아이템 설명 */}
          <div className={clsx('text-gray-700', 'text-14')}>
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
        <div className={clsx('shrink-0')}>
          <StatusTag variant={getStatusTagVariant(item.status)} />
        </div>
      </div>

      {/* 두 번째 줄 (취소 버튼 - 대기중일 때만) */}
      {isPending && (
        <div className={clsx('w-full', 'tablet:w-auto')}>
          <Button
            variant="secondary"
            onClick={handleCancelClick}
            className="w-full h-40 tablet:w-auto tablet:h-44"
          >
            요청 취소
          </Button>
        </div>
      )}
    </div>
  );
};

/**
 * 태블릿/데스크탑 레이아웃 아이템 행
 */
const PurchaseRequestItemRowDesktop: React.FC<PurchaseRequestItemRowProps> = ({
  item,
  onCancel,
}) => {
  const isPending = item.status === 'PENDING';
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
        'py-16',
        'border-b border-gray-200',
        'gap-16 tablet:gap-24 desktop:gap-32'
      )}
    >
      {/* 날짜 */}
      <div className={clsx('text-gray-700', 'text-14', 'font-bold', 'shrink-0', 'w-100')}>
        {formatDate(item.createdAt)}
      </div>

      {/* 아이템 설명 */}
      <div className={clsx('text-gray-700', 'text-14', 'flex-1', 'min-w-0')}>
        {formatItemDescription(item.purchaseItems)}
      </div>

      {/* 가격 */}
      <div className={clsx('shrink-0', 'w-100', 'text-right')}>
        <PriceText
          value={totalPrice}
          showUnit
          className={clsx('text-gray-700', 'text-14', 'font-normal')}
        />
      </div>

      {/* 상태 태그 */}
      <div className={clsx('shrink-0')}>
        <StatusTag variant={getStatusTagVariant(item.status)} />
      </div>

      {/* 취소 버튼 (대기중일 때만) */}
      {isPending && (
        <div className={clsx('shrink-0')}>
          <Button variant="secondary" onClick={handleCancelClick} className="w-126 h-44">
            요청 취소
          </Button>
        </div>
      )}
    </div>
  );
};

/**
 * 구매 요청 아이템 리스트 컴포넌트
 */
const PurchaseRequestItemListOrg: React.FC<PurchaseRequestItemListOrgProps> = ({
  purchaseList,
  className,
  onCancel,
}) => {
  const handleCancel = useCallback(
    async (purchaseRequestId: string) => {
      try {
        await cancelPurchaseRequest(purchaseRequestId);
        if (onCancel) {
          await onCancel(purchaseRequestId);
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('구매 요청 취소 실패:', error);
        }
        // TODO: 에러 토스트 메시지 표시
      }
    },
    [onCancel]
  );

  return (
    <div className={clsx('w-full', className)}>
      {purchaseList.map((item) => (
        <React.Fragment key={item.id}>
          {/* 모바일 레이아웃 */}
          <div className={clsx('tablet:hidden')}>
            <PurchaseRequestItemRowMobile item={item} onCancel={handleCancel} />
          </div>

          {/* 태블릿/데스크탑 레이아웃 */}
          <div className={clsx('hidden tablet:block')}>
            <PurchaseRequestItemRowDesktop item={item} onCancel={handleCancel} />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default PurchaseRequestItemListOrg;
