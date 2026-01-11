import { PURCHASE_HISTORY_LABELS } from '../../constants/labels';

/**
 * 구매 내역 테이블 헤더 컴포넌트
 * PurchaseHistoryTem과 PurchaseHistoryListOrg에서 재사용
 */
export const PurchaseHistoryTableHeader = () => (
  <div className="hidden desktop:grid desktop:grid-cols-[130px_160px_1fr_140px_120px_100px] desktop:gap-16 desktop:items-center desktop:h-60 w-full desktop:border-b desktop:border-gray-200">
    <span className="text-16 text-gray-700 pl-40">
      {PURCHASE_HISTORY_LABELS.TABLE_HEADERS.REQUEST_DATE}
    </span>
    <span className="text-16 text-gray-700">{PURCHASE_HISTORY_LABELS.TABLE_HEADERS.REQUESTER}</span>
    <span className="text-16 text-gray-700">{PURCHASE_HISTORY_LABELS.TABLE_HEADERS.PRODUCTS}</span>
    <span className="text-16 text-gray-700">
      {PURCHASE_HISTORY_LABELS.TABLE_HEADERS.TOTAL_PRICE}
    </span>
    <span className="text-16 text-gray-700">
      {PURCHASE_HISTORY_LABELS.TABLE_HEADERS.APPROVAL_DATE}
    </span>
    <span className="text-16 text-gray-700">{PURCHASE_HISTORY_LABELS.TABLE_HEADERS.MANAGER}</span>
  </div>
);
