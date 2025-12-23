'use client';

import { clsx } from '@/utils/clsx';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import { Divider } from '@/components/atoms/Divider/Divider';
import PriceText from '@/components/atoms/PriceText/PriceText';
import DateText from '@/components/atoms/DateText/DateText';

interface PurchaseRequestDetailOrgProps {
  purchaseRequest: PurchaseRequestItem;
  approvedInfo?: {
    approverName: string;
    approvalDate: string | null;
    statusLabel: string;
    resultMessage: string;
  };
  budgetInfo?: {
    monthlySpending: number;
    remainingBudget: number;
    budgetAfterPurchase: number;
  };
}

// TotalSummary 섹션
interface TotalSummaryProps {
  totalPrice: number;
  shippingFee: number;
}

const TotalSummary = ({ totalPrice, shippingFee }: TotalSummaryProps) => (
  <div className="flex flex-col gap-y-16">
    <div className="flex items-center justify-between text-14">
      주문금액
      <PriceText value={totalPrice} />
    </div>
    <div className="flex items-center justify-between text-14">
      배송비
      <PriceText value={shippingFee} />
    </div>
    <div className="flex items-center justify-between text-18 font-bold mb-30">
      총 주문 금액
      <PriceText value={totalPrice + shippingFee} />
    </div>
  </div>
);

// RequestInfo 섹션
interface RequestInfoProps {
  requester: PurchaseRequestItem['requester'];
  createdAt: string;
  requestMessage?: string;
}

const RequestInfoMobile = ({ requester, createdAt, requestMessage }: RequestInfoProps) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-14 py-14">요청 정보</h1>
    <Divider orientation="horizontal" variant="thick" />
    <div className="grid grid-cols-[140px_1fr] border-b border-gray-100">
      <p className="text-14 border-r border-gray-100 p-16">요청인</p>
      <p className="text-14 p-16">{requester.name}</p>
    </div>
    <div className="grid grid-cols-[140px_1fr] border-b border-gray-100">
      <p className="text-14 border-r border-gray-100 p-16">요청 날짜</p>
      <p className="text-14 p-16">
        <DateText date={createdAt} />
      </p>
    </div>
    {requestMessage && (
      <div className="grid grid-cols-[140px_1fr] border-b border-gray-100">
        <p className="text-14 border-r border-gray-100 p-16">요청 메시지</p>
        <p className="text-14 p-16 wrap-break-word">{requestMessage}</p>
      </div>
    )}
  </div>
);

const RequestInfoTablet = ({ requester, createdAt, requestMessage }: RequestInfoProps) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-16 py-14">요청 정보</h1>
    <Divider orientation="horizontal" variant="thick" />
    <div className="grid grid-cols-[140px_1fr_140px_1fr] border-b border-gray-100">
      <p className="text-16 border-r border-gray-100 p-16">요청인</p>
      <p className="text-16 border-r border-gray-100 p-16">{requester.name}</p>
      <p className="text-16 border-r border-gray-100 p-16">요청 날짜</p>
      <p className="text-16 p-16">
        <DateText date={createdAt} className="text-16" />
      </p>
    </div>
    {requestMessage && (
      <div className="grid grid-cols-[140px_3fr] border-b border-gray-100">
        <p className="text-16 border-r border-gray-100 p-16">요청 메시지</p>
        <p className="text-16 p-16 wrap-break-word">{requestMessage}</p>
      </div>
    )}
  </div>
);

const RequestInfoDesktop = ({ requester, createdAt, requestMessage }: RequestInfoProps) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-16 py-14">요청 정보</h1>
    <Divider orientation="horizontal" variant="thick" />
    <div className="grid grid-cols-[140px_1fr_140px_1fr] border-b border-gray-100">
      <p className="text-16 border-r border-gray-100 p-16">요청인</p>
      <p className="text-16 border-r border-gray-100 p-16">{requester.name}</p>
      <p className="text-16 border-r border-gray-100 p-16">요청 날짜</p>
      <p className="text-16 p-16">
        <DateText date={createdAt} className="text-16" />
      </p>
    </div>
    {requestMessage && (
      <div className="grid grid-cols-[140px_3fr] border-b border-gray-100">
        <p className="text-16 border-r border-gray-100 p-16">요청 메시지</p>
        <p className="text-16 p-16 wrap-break-word">{requestMessage}</p>
      </div>
    )}
  </div>
);

// ApprovedInfo 섹션
interface ApprovedInfoProps {
  approverName: string;
  approvalDate: string | null;
  statusLabel: string;
  resultMessage: string;
}

const ApprovedInfoMobile = ({
  approverName,
  approvalDate,
  statusLabel,
  resultMessage,
}: ApprovedInfoProps) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-14 py-14">승인 정보</h1>
    <Divider orientation="horizontal" variant="thick" />
    <div className="grid grid-cols-[140px_1fr] border-b border-gray-100">
      <p className="text-14 border-r border-gray-100 p-16">담당자</p>
      <p className="text-14 p-16">{approverName}</p>
    </div>
    <div className="grid grid-cols-[140px_1fr] border-b border-gray-100">
      <p className="text-14 border-r border-gray-100 p-16">승인 날짜</p>
      <p className="text-14 p-16">{approvalDate ? <DateText date={approvalDate} /> : '-'}</p>
    </div>
    <div className="grid grid-cols-[140px_1fr] border-b border-gray-100">
      <p className="text-14 border-r border-gray-100 p-16">상태</p>
      <p className="text-14 p-16">{statusLabel}</p>
    </div>
    <div className="grid grid-cols-[140px_1fr] border-b border-gray-100">
      <p className="text-14 border-r border-gray-100 p-16">결과 메시지</p>
      <p className="text-14 p-16 wrap-break-word">{resultMessage}</p>
    </div>
  </div>
);

const ApprovedInfoTablet = ({
  approverName,
  approvalDate,
  statusLabel,
  resultMessage,
}: ApprovedInfoProps) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-16 py-14">승인 정보</h1>
    <Divider orientation="horizontal" variant="thick" />
    <div className="grid grid-cols-[140px_1fr_140px_1fr] border-b border-gray-100">
      <p className="text-16 border-r border-gray-100 p-16">담당자</p>
      <p className="text-16 border-r border-gray-100 p-16">{approverName}</p>
      <p className="text-16 border-r border-gray-100 p-16">승인 날짜</p>
      <p className="text-16 p-16">
        {approvalDate ? <DateText date={approvalDate} className="text-16" /> : '-'}
      </p>
    </div>
    <div className="grid grid-cols-[140px_1fr_140px_1fr] border-b border-gray-100 items-start">
      <p className="text-16 border-r border-gray-100 p-16">상태</p>
      <p className="text-16 border-r border-gray-100 p-16">{statusLabel}</p>
      <p className="text-16 border-r border-gray-100 p-16">결과 메시지</p>
      <p className="text-16 p-16 wrap-break-word">{resultMessage}</p>
    </div>
  </div>
);

const ApprovedInfoDesktop = ({
  approverName,
  approvalDate,
  statusLabel,
  resultMessage,
}: ApprovedInfoProps) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-16 py-14">승인 정보</h1>
    <Divider orientation="horizontal" variant="thick" />
    <div className="grid grid-cols-[140px_1fr_140px_1fr] border-b border-gray-100">
      <p className="text-16 border-r border-gray-100 p-16">담당자</p>
      <p className="text-16 border-r border-gray-100 p-16">{approverName}</p>
      <p className="text-16 border-r border-gray-100 p-16">승인 날짜</p>
      <p className="text-16 p-16">
        {approvalDate ? <DateText date={approvalDate} className="text-16" /> : '-'}
      </p>
    </div>
    <div className="grid grid-cols-[140px_1fr_140px_1fr] border-b border-gray-100 items-start">
      <p className="text-16 border-r border-gray-100 p-16">상태</p>
      <p className="text-16 border-r border-gray-100 p-16">{statusLabel}</p>
      <p className="text-16 border-r border-gray-100 p-16">결과 메시지</p>
      <p className="text-16 p-16 wrap-break-word">{resultMessage}</p>
    </div>
  </div>
);

// BudgetInfo 섹션
interface BudgetInfoProps {
  monthlySpending: number;
  remainingBudget: number;
  budgetAfterPurchase: number;
}

const BudgetInfoMobile = ({
  monthlySpending,
  remainingBudget,
  budgetAfterPurchase,
}: BudgetInfoProps) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-14 py-14">예산 정보</h1>
    <Divider orientation="horizontal" variant="thick" />
    <div className="grid grid-cols-[1fr_auto] border-b border-gray-100">
      <p className="text-14 border-r border-gray-100 p-16">이번 달 지출액</p>
      <p className="text-14 p-16">
        <PriceText value={monthlySpending} />
      </p>
    </div>
    <div className="grid grid-cols-[1fr_auto] border-b border-gray-100">
      <p className="text-14 border-r border-gray-100 p-16">이번 달 남은 예산</p>
      <p className="text-14 p-16">
        <PriceText value={remainingBudget} />
      </p>
    </div>
    <div className="grid grid-cols-[1fr_auto] border-b border-gray-100">
      <p className="text-14 border-r border-gray-100 p-16">구매 후 예산</p>
      <p className="text-14 p-16">
        <PriceText value={budgetAfterPurchase} />
      </p>
    </div>
  </div>
);

const BudgetInfoTablet = ({
  monthlySpending,
  remainingBudget,
  budgetAfterPurchase,
}: BudgetInfoProps) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-16 py-14">예산 정보</h1>
    <Divider orientation="horizontal" variant="thick" />
    <div className="grid grid-cols-[1fr_auto] border-b border-gray-100">
      <p className="text-16 border-r border-gray-100 p-16">이번 달 지출액</p>
      <p className="text-16 p-16">
        <PriceText value={monthlySpending} className="text-16" />
      </p>
    </div>
    <div className="grid grid-cols-[1fr_auto] border-b border-gray-100">
      <p className="text-16 border-r border-gray-100 p-16">이번 달 남은 예산</p>
      <p className="text-16 p-16">
        <PriceText value={remainingBudget} className="text-16" />
      </p>
    </div>
    <div className="grid grid-cols-[1fr_auto] border-b border-gray-100">
      <p className="text-16 border-r border-gray-100 p-16">구매 후 예산</p>
      <p className="text-16 p-16">
        <PriceText value={budgetAfterPurchase} className="text-16" />
      </p>
    </div>
  </div>
);

const BudgetInfoDesktop = ({
  monthlySpending,
  remainingBudget,
  budgetAfterPurchase,
}: BudgetInfoProps) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-16 py-14">예산 정보</h1>
    <Divider orientation="horizontal" variant="thick" />
    <div className="grid grid-cols-[1fr_auto] border-b border-gray-100">
      <p className="text-16 border-r border-gray-100 p-16">이번 달 지출액</p>
      <p className="text-16 p-16">
        <PriceText value={monthlySpending} className="text-16" />
      </p>
    </div>
    <div className="grid grid-cols-[1fr_auto] border-b border-gray-100">
      <p className="text-16 border-r border-gray-100 p-16">이번 달 남은 예산</p>
      <p className="text-16 p-16">
        <PriceText value={remainingBudget} className="text-16" />
      </p>
    </div>
    <div className="grid grid-cols-[1fr_auto] border-b border-gray-100">
      <p className="text-16 border-r border-gray-100 p-16">구매 후 예산</p>
      <p className="text-16 p-16">
        <PriceText value={budgetAfterPurchase} className="text-16" />
      </p>
    </div>
  </div>
);

// 메인 컴포넌트
const PurchaseRequestDetailOrg = ({
  purchaseRequest,
  approvedInfo,
  budgetInfo,
}: PurchaseRequestDetailOrgProps) => (
  <>
    {/* Mobile */}
    <div className={clsx('flex flex-col tablet:hidden desktop:hidden')}>
      <Divider className="my-16" />
      <TotalSummary
        totalPrice={purchaseRequest.totalPrice}
        shippingFee={purchaseRequest.shippingFee}
      />
      <RequestInfoMobile
        requester={purchaseRequest.requester}
        createdAt={purchaseRequest.createdAt}
        requestMessage={purchaseRequest.requestMessage}
      />
      {budgetInfo && (
        <BudgetInfoMobile
          monthlySpending={budgetInfo.monthlySpending}
          remainingBudget={budgetInfo.remainingBudget}
          budgetAfterPurchase={budgetInfo.budgetAfterPurchase}
        />
      )}
      {approvedInfo && (
        <ApprovedInfoMobile
          approverName={approvedInfo.approverName}
          approvalDate={approvedInfo.approvalDate}
          statusLabel={approvedInfo.statusLabel}
          resultMessage={approvedInfo.resultMessage}
        />
      )}
    </div>

    {/* Tablet */}
    <div className={clsx('hidden tablet:flex desktop:hidden flex-col')}>
      <Divider className="my-16" />
      <TotalSummary
        totalPrice={purchaseRequest.totalPrice}
        shippingFee={purchaseRequest.shippingFee}
      />
      <RequestInfoTablet
        requester={purchaseRequest.requester}
        createdAt={purchaseRequest.createdAt}
        requestMessage={purchaseRequest.requestMessage}
      />
      {budgetInfo && (
        <BudgetInfoTablet
          monthlySpending={budgetInfo.monthlySpending}
          remainingBudget={budgetInfo.remainingBudget}
          budgetAfterPurchase={budgetInfo.budgetAfterPurchase}
        />
      )}
      {approvedInfo && (
        <ApprovedInfoTablet
          approverName={approvedInfo.approverName}
          approvalDate={approvedInfo.approvalDate}
          statusLabel={approvedInfo.statusLabel}
          resultMessage={approvedInfo.resultMessage}
        />
      )}
    </div>

    {/* Desktop */}
    <div className={clsx('hidden desktop:flex flex-col gap-y-50')}>
      <Divider className="my-16" />
      <TotalSummary
        totalPrice={purchaseRequest.totalPrice}
        shippingFee={purchaseRequest.shippingFee}
      />
      <RequestInfoDesktop
        requester={purchaseRequest.requester}
        createdAt={purchaseRequest.createdAt}
        requestMessage={purchaseRequest.requestMessage}
      />
      {budgetInfo && (
        <BudgetInfoDesktop
          monthlySpending={budgetInfo.monthlySpending}
          remainingBudget={budgetInfo.remainingBudget}
          budgetAfterPurchase={budgetInfo.budgetAfterPurchase}
        />
      )}
      {approvedInfo && (
        <ApprovedInfoDesktop
          approverName={approvedInfo.approverName}
          approvalDate={approvedInfo.approvalDate}
          statusLabel={approvedInfo.statusLabel}
          resultMessage={approvedInfo.resultMessage}
        />
      )}
    </div>
  </>
);

export default PurchaseRequestDetailOrg;
