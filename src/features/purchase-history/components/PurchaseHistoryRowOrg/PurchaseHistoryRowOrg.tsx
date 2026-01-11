'use client';

import React, { useCallback, useMemo } from 'react';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import PriceText from '@/components/atoms/PriceText/PriceText';
import DateText from '@/components/atoms/DateText/DateText';
import StatusTag from '@/components/atoms/StatusTag/StatusTag';
import { formatItemDescription } from '@/features/purchase/utils/purchase.utils';
import { PURCHASE_HISTORY_LABELS } from '../../constants/labels';

interface PurchaseHistoryRowOrgProps {
  item: PurchaseRequestItem;
  isFirst?: boolean;
  onItemClick?: (orderId: string) => void;
}

interface UsePurchaseItemReturn {
  itemDescription: string;
  totalQuantity: number;
  isUrgent: boolean;
  handleItemClick: () => void;
  handleItemKeyDown: (e: React.KeyboardEvent) => void;
}

const usePurchaseItem = (
  item: PurchaseRequestItem,
  onItemClick?: (orderId: string) => void
): UsePurchaseItemReturn => {
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
    onItemClick?.(item.id);
  }, [onItemClick, item.id]);

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

const RequesterWithUrgentTag = ({ name, isUrgent }: { name: string; isUrgent: boolean }) => (
  <span className="flex items-center gap-16">
    {name}
    {isUrgent && <StatusTag variant="urgent" className="text-12" />}
  </span>
);

interface ClickableHeaderProps {
  itemDescription: string;
  totalQuantity: number;
  price: number;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  textSize: 'sm' | 'md';
}

const ClickableHeader = ({
  itemDescription,
  totalQuantity,
  price,
  onClick,
  onKeyDown,
  textSize,
}: ClickableHeaderProps) => {
  const textSizeClass = textSize === 'sm' ? 'text-14' : 'text-16';
  const priceSizeClass = textSize === 'sm' ? 'text-16' : 'text-18';

  return (
    <div className="flex items-center justify-between px-16 tablet:px-20 py-8 border-b border-gray-200">
      <div
        role="button"
        tabIndex={0}
        className="flex items-center gap-8 cursor-pointer hover:opacity-70 transition-opacity"
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        <span className={`${textSizeClass} font-bold text-gray-950`}>{itemDescription}</span>
        <span className="text-12 text-gray-500">
          {PURCHASE_HISTORY_LABELS.ROW_LABELS.TOTAL_QUANTITY} {totalQuantity}
          {PURCHASE_HISTORY_LABELS.QUANTITY_UNIT}
        </span>
      </div>
      <PriceText value={price} className={`${priceSizeClass} font-bold`} />
    </div>
  );
};

interface InfoRowProps {
  label: string;
  value: React.ReactNode;
  textSize?: 'sm' | 'md';
}

const MobileInfoRow = ({ label, value, textSize = 'sm' }: InfoRowProps) => {
  const sizeClass = textSize === 'sm' ? 'text-14' : 'text-16';

  return (
    <div className="grid grid-cols-[140px_1fr] border-b border-gray-100">
      <p className={`${sizeClass} border-r border-gray-100 p-16`}>{label}</p>
      <p className={`${sizeClass} p-16`}>{value}</p>
    </div>
  );
};

interface TabletInfoGridProps {
  rows: Array<{ label: string; value: React.ReactNode; id: string }>;
}

const TabletInfoGrid = ({ rows }: TabletInfoGridProps) => (
  <div className="grid grid-cols-[140px_1fr_140px_1fr]">
    {rows.map(({ label, value, id }, index) => (
      <React.Fragment key={id}>
        <div className="text-16 border-r border-b border-gray-100 flex items-center px-20 py-15">
          {label}
        </div>
        <div
          className={`text-16 ${index % 2 === 0 ? 'border-r' : ''} border-b border-gray-100 flex items-center px-20 py-15`}
        >
          {value}
        </div>
      </React.Fragment>
    ))}
  </div>
);

export const PurchaseHistoryRowOrg = ({
  item,
  isFirst = false,
  onItemClick,
}: PurchaseHistoryRowOrgProps) => {
  const { itemDescription, totalQuantity, isUrgent, handleItemClick, handleItemKeyDown } =
    usePurchaseItem(item, onItemClick);

  const totalPrice = item.itemsTotalPrice ?? item.totalPrice ?? 0;

  const mobileInfoRows = [
    {
      id: 'request-date',
      label: PURCHASE_HISTORY_LABELS.ROW_LABELS.REQUEST_DATE,
      value: <DateText date={item.createdAt} className="text-14" />,
    },
    {
      id: 'requester',
      label: PURCHASE_HISTORY_LABELS.ROW_LABELS.REQUESTER,
      value: <RequesterWithUrgentTag name={item.requester?.name || '-'} isUrgent={isUrgent} />,
    },
    {
      id: 'approval-date',
      label: PURCHASE_HISTORY_LABELS.ROW_LABELS.APPROVAL_DATE,
      value: item.approver ? <DateText date={item.updatedAt} className="text-14" /> : '-',
    },
    {
      id: 'manager',
      label: PURCHASE_HISTORY_LABELS.ROW_LABELS.MANAGER,
      value: item.approver?.name || '-',
    },
  ];

  const tabletInfoRows = [
    {
      id: 'request-date',
      label: PURCHASE_HISTORY_LABELS.ROW_LABELS.REQUEST_DATE,
      value: <DateText date={item.createdAt} className="text-16" />,
    },
    {
      id: 'requester',
      label: PURCHASE_HISTORY_LABELS.ROW_LABELS.REQUESTER,
      value: <RequesterWithUrgentTag name={item.requester?.name || '-'} isUrgent={isUrgent} />,
    },
    {
      id: 'approval-date',
      label: PURCHASE_HISTORY_LABELS.ROW_LABELS.APPROVAL_DATE,
      value: item.approver ? <DateText date={item.updatedAt} className="text-16" /> : '-',
    },
    {
      id: 'manager',
      label: PURCHASE_HISTORY_LABELS.ROW_LABELS.MANAGER,
      value: item.approver?.name || '-',
    },
  ];

  return (
    <>
      {/* Mobile: Card Layout */}
      <div
        className={`w-full border-b border-gray-200 ${isFirst ? 'border-t border-gray-200' : ''} flex flex-col tablet:hidden`}
      >
        <ClickableHeader
          itemDescription={itemDescription}
          totalQuantity={totalQuantity}
          price={totalPrice}
          onClick={handleItemClick}
          onKeyDown={handleItemKeyDown}
          textSize="sm"
        />
        <div className="flex flex-col">
          {mobileInfoRows.map((row) => (
            <MobileInfoRow key={row.id} label={row.label} value={row.value} textSize="sm" />
          ))}
        </div>
      </div>

      {/* Tablet: Card Layout */}
      <div
        className={`w-full border-b border-gray-200 ${isFirst ? 'border-t border-gray-200' : ''} hidden tablet:flex desktop:hidden flex-col`}
      >
        <ClickableHeader
          itemDescription={itemDescription}
          totalQuantity={totalQuantity}
          price={totalPrice}
          onClick={handleItemClick}
          onKeyDown={handleItemKeyDown}
          textSize="md"
        />
        <div className="flex flex-col">
          <TabletInfoGrid rows={tabletInfoRows.slice(0, 2)} />
          <TabletInfoGrid rows={tabletInfoRows.slice(2, 4)} />
        </div>
      </div>

      {/* Desktop: Row Layout */}
      <div className="hidden desktop:grid desktop:grid-cols-[130px_160px_1fr_140px_120px_100px] desktop:gap-16 desktop:items-center desktop:h-100 w-full border-b border-gray-200">
        <DateText date={item.createdAt} className="flex items-center h-100 text-16 px-40" />
        <div className="flex items-center gap-8">
          <span className="text-16 text-gray-950">{item.requester?.name || '-'}</span>
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
          <span className="text-14 text-gray-500">
            {PURCHASE_HISTORY_LABELS.ROW_LABELS.TOTAL_QUANTITY_DESKTOP} {totalQuantity}
            {PURCHASE_HISTORY_LABELS.QUANTITY_UNIT}
          </span>
        </div>
        <PriceText value={totalPrice} className="text-16 font-normal" />
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
