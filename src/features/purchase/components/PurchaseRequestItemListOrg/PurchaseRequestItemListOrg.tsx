// 내 구매 요청 내역 - MyPurchaseRequestListPage
// GET /api/v1/purchase/user/getMyPurchases

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { clsx } from '@/utils/clsx';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import PriceText from '@/components/atoms/PriceText/PriceText';
import Button from '@/components/atoms/Button/Button';
import UserProfile from '@/components/molecules/UserProfile/UserProfile';
import { formatDate, formatItemDescription } from '@/features/purchase/utils/purchase.utils';

/**
 * PurchaseRequestItemListOrg Props
 */
export interface PurchaseRequestItemListOrgProps {
  purchaseList: PurchaseRequestItem[];
  className?: string;
  onReject?: (purchaseRequestId: string) => void;
  onApprove?: (purchaseRequestId: string) => void;
  onCancel?: (purchaseRequestId: string) => void;
  companyId?: string;
}

interface PurchaseRequestItemRowProps {
  item: PurchaseRequestItem;
  onReject?: (purchaseRequestId: string) => void;
  onApprove?: (purchaseRequestId: string) => void;
  onCancel?: (purchaseRequestId: string) => void;
  companyId?: string;
}

/**
 * 모바일 레이아웃 아이템 행
 */
const PurchaseRequestItemRowMobile: React.FC<PurchaseRequestItemRowProps> = ({
  item,
  onReject,
  onApprove,
  onCancel,
  companyId,
}) => {
  const router = useRouter();
  const isPending = item.status === 'PENDING';
  const isUrgent = item.urgent === true;
  const totalPrice = item.totalPrice + item.shippingFee;

  const handleRowClick = () => {
    if (companyId) {
      router.push(`/${companyId}/my/purchase-requests/${item.id}`);
    }
  };

  const handleRowKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleRowClick();
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
      onClick={handleRowClick}
      onKeyDown={handleRowKeyDown}
    >
      {/* 첫 번째 줄: 2개 컬럼 (왼쪽: 날짜/제목/금액, 오른쪽: 요청인) */}
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

        {/* 오른쪽 컬럼: 요청인 */}
        <div className={clsx('shrink-0')}>
          <UserProfile
            name={item.requester.name}
            company={{ name: item.requester.company || '' }}
            avatarSrc={item.requester.avatarSrc}
            profileHref={companyId ? `/${companyId}/my/profile` : undefined}
            variant="nameOnly"
          />
        </div>
      </div>

      {/* 두 번째 줄 (반려/승인 버튼 또는 취소 버튼 - 대기중일 때만) */}
      {isPending && (
        <>
          {onReject && onApprove && (
            <div className={clsx('w-full', 'flex gap-8')}>
              <Button
                variant="secondary"
                onClick={handleRejectClick}
                className="flex-1 h-40 tablet:w-auto tablet:h-44"
              >
                반려
              </Button>
              <Button
                variant="primary"
                onClick={handleApproveClick}
                className="flex-1 h-40 tablet:w-auto tablet:h-44"
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
const PurchaseRequestItemRowDesktop: React.FC<PurchaseRequestItemRowProps> = ({
  item,
  onReject,
  onApprove,
  onCancel,
  companyId,
}) => {
  const router = useRouter();
  const isPending = item.status === 'PENDING';
  const isUrgent = item.urgent === true;
  const totalPrice = item.totalPrice + item.shippingFee;

  const handleRowClick = () => {
    if (companyId) {
      router.push(`/${companyId}/my/purchase-requests/${item.id}`);
    }
  };

  const handleRowKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleRowClick();
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

      {/* 요청인 */}
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
        <UserProfile
          name={item.requester.name}
          company={{ name: item.requester.company || '' }}
          avatarSrc={item.requester.avatarSrc}
          profileHref={companyId ? `/${companyId}/my/profile` : undefined}
          variant="secondary"
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
              <Button variant="secondary" onClick={handleRejectClick} className="h-44">
                반려
              </Button>
              <Button variant="primary" onClick={handleApproveClick} className="h-44">
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
const PurchaseRequestItemListOrg: React.FC<PurchaseRequestItemListOrgProps> = ({
  purchaseList,
  className,
  onReject,
  onApprove,
  onCancel,
  companyId,
}) => (
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
            companyId={companyId}
          />
        </div>
      </React.Fragment>
    ))}
  </div>
);

export default PurchaseRequestItemListOrg;
