/**
 * 구매 내역 테이블 헤더 컴포넌트
 * PurchaseHistoryTem과 PurchaseHistoryListOrg에서 재사용
 */
export const PurchaseHistoryTableHeader = () => (
  <div className="hidden desktop:grid desktop:grid-cols-[130px_160px_1fr_140px_120px_100px] desktop:gap-16 desktop:items-center desktop:h-60 w-full desktop:border-b desktop:border-gray-200">
    <span className="text-16 text-gray-700 pl-40">구매 요청일</span>
    <span className="text-16 text-gray-700">요청인</span>
    <span className="text-16 text-gray-700">구매 물품</span>
    <span className="text-16 text-gray-700">총 금액</span>
    <span className="text-16 text-gray-700">구매 승인일</span>
    <span className="text-16 text-gray-700">담당자</span>
  </div>
);
