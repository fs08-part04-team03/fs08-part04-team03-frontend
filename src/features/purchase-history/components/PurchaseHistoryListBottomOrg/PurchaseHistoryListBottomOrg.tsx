'use client';

import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import PriceText from '@/components/atoms/PriceText/PriceText';
import DateText from '@/components/atoms/DateText/DateText';
import StatusTag from '@/components/atoms/StatusTag/StatusTag';
import { formatItemDescription } from '@/features/purchase/utils/purchase.utils';

interface PurchaseHistoryListBottomOrgProps {
  item: PurchaseRequestItem;
  companyId: string;
}

interface UsePurchaseItemReturn {
  itemDescription: string;
  totalQuantity: number;
  isUrgent: boolean;
  handleRowClick: () => void;
  handleRowKeyDown: (e: React.KeyboardEvent) => void;
}

const usePurchaseItem = (item: PurchaseRequestItem, companyId: string): UsePurchaseItemReturn => {
  const router = useRouter();

  const itemDescription = useMemo(
    () => formatItemDescription(item.purchaseItems),
    [item.purchaseItems]
  );

  const totalQuantity = useMemo(
    () => item.purchaseItems.reduce((sum, purchaseItem) => sum + purchaseItem.quantity, 0),
    [item.purchaseItems]
  );

  const isUrgent = item.urgent === true;

  const handleRowClick = useCallback(() => {
    router.push(`/${companyId}/purchase-history/${item.id}`);
  }, [router, companyId, item.id]);

  const handleRowKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleRowClick();
      }
    },
    [handleRowClick]
  );

  return {
    itemDescription,
    totalQuantity,
    isUrgent,
    handleRowClick,
    handleRowKeyDown,
  };
};

const RequesterWithUrgentTag: React.FC<{ name: string; isUrgent: boolean }> = ({
  name,
  isUrgent,
}) => (
  <span className="flex items-center gap-8">
    {name}
    {isUrgent && <StatusTag variant="urgent" className="text-12" />}
  </span>
);

export const PurchaseHistoryListBottomOrg: React.FC<PurchaseHistoryListBottomOrgProps> = ({
  item,
  companyId,
}) => {
  const { itemDescription, totalQuantity, isUrgent, handleRowClick, handleRowKeyDown } =
    usePurchaseItem(item, companyId);

  return (
    <div
      role="button"
      tabIndex={0}
      className="w-full gap-12 border-b border-gray-200 cursor-pointer hover:bg-gray-50 flex flex-col tablet:flex desktop:grid desktop:grid-cols-[120px_120px_1fr_140px_120px_100px] desktop:gap-16 desktop:items-center"
      onClick={handleRowClick}
      onKeyDown={handleRowKeyDown}
    >
      {/* Mobile & Tablet Layout */}
      <div className="flex flex-col desktop:hidden">
        <div className="flex items-start justify-between gap-12 pb-16 border-b border-gray-200">
          <div className="flex flex-col gap-4 flex-1 min-w-0">
            <div className="flex items-center gap-8 flex-wrap">
              <span className="font-bold text-14 tablet:text-16 text-gray-950">
                {itemDescription}
              </span>
              <span className="text-12 tablet:text-14 text-gray-500">총수량 {totalQuantity}개</span>
            </div>
          </div>
          <PriceText
            value={item.totalPrice}
            className="text-16 tablet:text-18 font-bold shrink-0"
          />
        </div>

        {/* Mobile: Single Column */}
        <div className="flex flex-col tablet:hidden">
          <div className="grid grid-cols-[140px_1fr] border-b border-gray-100">
            <p className="text-14 border-r border-gray-100 p-16">구매 요청일</p>
            <p className="text-14 p-16">
              <DateText date={item.createdAt} className="text-14" />
            </p>
          </div>
          <div className="grid grid-cols-[140px_1fr] border-b border-gray-100">
            <p className="text-14 border-r border-gray-100 p-16">요청인</p>
            <p className="text-14 p-16">
              <RequesterWithUrgentTag name={item.requester.name} isUrgent={isUrgent} />
            </p>
          </div>
          <div className="grid grid-cols-[140px_1fr] border-b border-gray-100">
            <p className="text-14 border-r border-gray-100 p-16">구매 승인일</p>
            <p className="text-14 p-16">
              {item.approver ? <DateText date={item.updatedAt} className="text-14" /> : '-'}
            </p>
          </div>
          <div className="grid grid-cols-[140px_1fr] border-b border-gray-100">
            <p className="text-14 border-r border-gray-100 p-16">담당자</p>
            <p className="text-14 p-16">{item.approver?.name || '-'}</p>
          </div>
        </div>

        {/* Tablet: Two Columns */}
        <div className="hidden tablet:flex desktop:hidden flex-col">
          <div className="grid grid-cols-[140px_1fr_140px_1fr] border-b border-gray-100">
            <p className="text-16 border-r border-gray-100">구매 요청일</p>
            <DateText date={item.createdAt} className="text-16 border-r border-gray-100" />
            <p className="text-16 border-r border-gray-100">요청인</p>
            <RequesterWithUrgentTag name={item.requester.name} isUrgent={isUrgent} />
          </div>
          <div className="grid grid-cols-[140px_1fr_140px_1fr] border-b border-gray-100">
            <p className="text-16 border-r border-gray-100">구매 승인일</p>
            {item.approver ? (
              <DateText date={item.updatedAt} className="text-16 border-r border-gray-100" />
            ) : (
              <p className="text-16 border-r border-gray-100">-</p>
            )}
            <p className="text-16 border-r border-gray-100">담당자</p>
            <p className="text-16">{item.approver?.name || '-'}</p>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <DateText date={item.createdAt} className="hidden desktop:block text-14" />
      <div className="hidden desktop:flex items-center gap-8">
        <span className="text-14 text-gray-950">{item.requester.name}</span>
        {isUrgent && <StatusTag variant="urgent" className="text-12" />}
      </div>
      <div className="hidden desktop:flex flex-col gap-4">
        <span className="text-14 text-gray-950">{itemDescription}</span>
        <span className="text-12 text-gray-500">총 수량 {totalQuantity}개</span>
      </div>
      <PriceText value={item.totalPrice} className="hidden desktop:block text-14 font-bold" />
      <DateText
        date={item.approver ? item.updatedAt : '-'}
        className="hidden desktop:block text-14"
      />
      <span className="hidden desktop:block text-14 text-gray-950">
        {item.approver?.name || '-'}
      </span>
    </div>
  );
};

export default PurchaseHistoryListBottomOrg;
