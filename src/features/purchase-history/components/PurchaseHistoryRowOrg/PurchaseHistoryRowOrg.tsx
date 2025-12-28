'use client';

import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import PriceText from '@/components/atoms/PriceText/PriceText';
import DateText from '@/components/atoms/DateText/DateText';
import StatusTag from '@/components/atoms/StatusTag/StatusTag';
import { formatItemDescription } from '@/features/purchase/utils/purchase.utils';

interface PurchaseHistoryRowOrgProps {
  item: PurchaseRequestItem;
  companyId: string;
  isFirst?: boolean;
}

interface UsePurchaseItemReturn {
  itemDescription: string;
  totalQuantity: number;
  isUrgent: boolean;
  handleItemClick: () => void;
  handleItemKeyDown: (e: React.KeyboardEvent) => void;
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

  const handleItemClick = useCallback(() => {
    router.push(`/${companyId}/purchase-history/${item.id}`);
  }, [router, companyId, item.id]);

  const handleItemKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleItemClick();
      }
    },
    [handleItemClick]
  );

  return {
    itemDescription,
    totalQuantity,
    isUrgent,
    handleItemClick,
    handleItemKeyDown,
  };
};

const RequesterWithUrgentTag: React.FC<{ name: string; isUrgent: boolean }> = ({
  name,
  isUrgent,
}) => (
  <span className="flex items-center gap-16">
    {name}
    {isUrgent && <StatusTag variant="urgent" className="text-12" />}
  </span>
);

export const PurchaseHistoryRowOrg: React.FC<PurchaseHistoryRowOrgProps> = ({
  item,
  companyId,
  isFirst = false,
}) => {
  const { itemDescription, totalQuantity, isUrgent, handleItemClick, handleItemKeyDown } =
    usePurchaseItem(item, companyId);

  return (
    <>
      {/* Mobile: Card Layout */}
      <div
        className={`w-full border-b border-gray-200 ${isFirst ? 'border-t border-gray-200' : ''} flex flex-col tablet:hidden`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-16 py-8 border-b border-gray-200">
          <div
            role="button"
            tabIndex={0}
            className="flex items-center gap-8 cursor-pointer hover:opacity-70 transition-opacity"
            onClick={handleItemClick}
            onKeyDown={handleItemKeyDown}
          >
            <span className="text-14 font-bold text-gray-950">{itemDescription}</span>
            <span className="text-12 text-gray-500">총수량 {totalQuantity}개</span>
          </div>
          <PriceText value={item.totalPrice} className="text-16 font-bold" />
        </div>
        {/* Mobile Content */}
        <div className="flex flex-col">
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
      </div>

      {/* Tablet: Card Layout */}
      <div
        className={`w-full border-b border-gray-200 ${isFirst ? 'border-t border-gray-200' : ''} hidden tablet:flex desktop:hidden flex-col`}
      >
        {/* Tablet Header */}
        <div className="flex items-center justify-between px-20 py-8 border-b border-gray-200">
          <div
            role="button"
            tabIndex={0}
            className="flex items-center gap-8 cursor-pointer hover:opacity-70 transition-opacity"
            onClick={handleItemClick}
            onKeyDown={handleItemKeyDown}
          >
            <span className="text-16 font-bold text-gray-950">{itemDescription}</span>
            <span className="text-12 text-gray-500">총수량 {totalQuantity}개</span>
          </div>
          <PriceText value={item.totalPrice} className="text-18 font-bold" />
        </div>
        {/* Tablet Content */}
        <div className="flex flex-col">
          <div className="grid grid-cols-[140px_1fr_140px_1fr]">
            <div className="text-16 border-r border-b border-gray-100 flex items-center px-20 py-15">
              구매 요청일
            </div>
            <div className="text-16 border-r border-b border-gray-100 flex items-center px-20 py-15">
              <DateText date={item.createdAt} className="text-16" />
            </div>
            <div className="text-16 border-r border-b border-gray-100 flex items-center px-20 py-15">
              요청인
            </div>
            <div className="text-16 border-b border-gray-100 flex items-center px-20 py-15">
              <RequesterWithUrgentTag name={item.requester.name} isUrgent={isUrgent} />
            </div>
          </div>
          <div className="grid grid-cols-[140px_1fr_140px_1fr]">
            <div className="text-16 border-r border-b border-gray-100 flex items-center px-20 py-15">
              구매 승인일
            </div>
            <div className="text-16 border-r border-b border-gray-100 flex items-center px-20 py-15">
              {item.approver ? <DateText date={item.updatedAt} className="text-16" /> : '-'}
            </div>
            <div className="text-16 border-r border-b border-gray-100 flex items-center px-20 py-15">
              담당자
            </div>
            <div className="text-16 border-b border-gray-100 flex items-center px-20 py-15">
              {item.approver?.name || '-'}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Row Layout */}
      <div className="hidden desktop:grid desktop:grid-cols-[130px_160px_1fr_140px_120px_100px] desktop:gap-16 desktop:items-center desktop:h-100 w-full border-b border-gray-200">
        <DateText date={item.createdAt} className="flex items-center h-100 text-16 px-40" />
        <div className="flex items-center gap-8">
          <span className="text-16 text-gray-950">{item.requester.name}</span>
          {isUrgent && <StatusTag variant="urgent" className="text-12" />}
        </div>
        <div
          role="button"
          tabIndex={0}
          className="flex flex-col gap-4 cursor-pointer hover:opacity-70 transition-opacity"
          onClick={handleItemClick}
          onKeyDown={handleItemKeyDown}
        >
          <span className="text-16 text-gray-950">{itemDescription}</span>
          <span className="text-14 text-gray-500">총 수량 {totalQuantity}개</span>
        </div>
        <PriceText value={item.totalPrice} className="text-16 font-normal" />
        <DateText
          date={item.approver ? item.updatedAt : '-'}
          className="flex items-center text-16"
        />
        <span className="text-16 text-gray-950">{item.approver?.name || '-'}</span>
      </div>
    </>
  );
};

export default PurchaseHistoryRowOrg;
