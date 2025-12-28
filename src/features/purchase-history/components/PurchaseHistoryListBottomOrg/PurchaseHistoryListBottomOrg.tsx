'use client';

import React from 'react';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import PaginationBlock from '@/components/molecules/PaginationBlock/PaginationBlock';
import PurchaseHistoryRowOrg from '../PurchaseHistoryRowOrg/PurchaseHistoryRowOrg';

interface PurchaseHistoryListOrgProps {
  items: PurchaseRequestItem[];
  companyId: string;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export const PurchaseHistoryListOrg: React.FC<PurchaseHistoryListOrgProps> = ({
  items,
  companyId,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  const handlePrev = (newPage: number) => {
    onPageChange?.(newPage);
  };

  const handleNext = (newPage: number) => {
    onPageChange?.(newPage);
  };

  return (
    <div className="w-full">
      {/* Desktop Table Header */}
      <div className="hidden desktop:grid desktop:grid-cols-[130px_160px_1fr_140px_120px_100px] desktop:gap-16 desktop:items-center desktop:h-60 w-full desktop:border-b desktop:border-gray-200">
        <span className="text-16 text-gray-700 pl-40">구매 요청일</span>
        <span className="text-16 text-gray-700">요청인</span>
        <span className="text-16 text-gray-700">구매 물품</span>
        <span className="text-16 text-gray-700">총 금액</span>
        <span className="text-16 text-gray-700">구매 승인일</span>
        <span className="text-16 text-gray-700">담당자</span>
      </div>

      {/* Items List */}
      <div className="w-full">
        {items.map((item, index) => (
          <div key={item.id} className="pb-26 tablet:pb-44 desktop:pb-0">
            <PurchaseHistoryRowOrg item={item} companyId={companyId} isFirst={index === 0} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-40 desktop:mt-60">
          <PaginationBlock
            current={currentPage}
            total={totalPages}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </div>
      )}
    </div>
  );
};

export default PurchaseHistoryListOrg;
