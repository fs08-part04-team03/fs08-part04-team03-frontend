'use client';

import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import PaginationBlock from '@/components/molecules/PaginationBlock/PaginationBlock';
import PurchaseHistoryRowOrg from '../PurchaseHistoryRowOrg/PurchaseHistoryRowOrg';
import { PurchaseHistoryTableHeader } from '../PurchaseHistoryTableHeader/PurchaseHistoryTableHeader';

interface PurchaseHistoryListOrgProps {
  items: PurchaseRequestItem[];
  companyId: string;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export const PurchaseHistoryListOrg = ({
  items,
  companyId,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}: PurchaseHistoryListOrgProps) => {
  const handlePrev = (newPage: number) => {
    onPageChange?.(newPage);
  };

  const handleNext = (newPage: number) => {
    onPageChange?.(newPage);
  };

  return (
    <div className="w-full">
      {/* Desktop Table Header */}
      <PurchaseHistoryTableHeader />

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
