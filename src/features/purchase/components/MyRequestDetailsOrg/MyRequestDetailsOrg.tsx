'use client';

import React from 'react';
import { clsx } from '@/utils/clsx';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import { Divider } from '@/components/atoms/Divider/Divider';
import PriceText from '@/components/atoms/PriceText/PriceText';
import DateText from '@/components/atoms/DateText/DateText';
import Button from '@/components/atoms/Button/Button';

interface MyRequestDetailsOrgProps {
  purchaseRequest: PurchaseRequestItem;
}

// Status를 한글로 변환하는 함수
const getStatusLabel = (status: PurchaseRequestItem['status']): string => {
  switch (status) {
    case 'PENDING':
      return '대기중';
    case 'APPROVED':
      return '요청 승인';
    case 'REJECTED':
      return '구매 반려';
    case 'CANCELLED':
      return '요청 취소';
    default:
      return status;
  }
};

// TotalSummary 섹션
interface TotalSummaryProps {
  totalPrice: number;
  shippingFee: number;
}

const TotalSummary: React.FC<TotalSummaryProps> = ({ totalPrice, shippingFee }) => (
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

const RequestInfoMobile: React.FC<RequestInfoProps> = ({
  requester,
  createdAt,
  requestMessage,
}) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-14 py-14">요청 정보</h1>
    <Divider orientation="horizontal" variant="thick" />
    <div className="flex items-center text-14 p-16">
      <p className="w-140">요청인</p>
      <p>{requester.name}</p>
    </div>
    <Divider orientation="horizontal" variant="thin" />
    <div className="flex items-center text-14 p-16">
      <p className="w-140">요청 날짜</p>
      <DateText date={createdAt} />
    </div>
    {requestMessage && (
      <>
        <Divider orientation="horizontal" variant="thin" />
        <div className="flex items-start text-14 h-142 overflow-scroll p-16">
          <p className="w-140">요청 메시지</p>
          <p>{requestMessage}</p>
        </div>
      </>
    )}
  </div>
);

const RequestInfoTablet: React.FC<RequestInfoProps> = ({
  requester,
  createdAt,
  requestMessage,
}) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-16 py-14">요청 정보</h1>
    <Divider orientation="horizontal" variant="thick" />
    <div className="grid grid-cols-[140px_1fr_140px_1fr] gap-y-16 p-16">
      <p className="text-16">요청인</p>
      <p className="text-16">{requester.name}</p>
      <p className="text-16">요청 날짜</p>
      <DateText date={createdAt} className="text-16" />
    </div>
    {requestMessage && (
      <div className="grid grid-cols-[140px_3fr] gap-y-16 p-16">
        <p className="text-16">요청 메시지</p>
        <p className="text-16">{requestMessage}</p>
      </div>
    )}
  </div>
);

const RequestInfoDesktop: React.FC<RequestInfoProps> = ({
  requester,
  createdAt,
  requestMessage,
}) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-16 py-14">요청 정보</h1>
    <Divider orientation="horizontal" variant="thick" />
    <div className="grid grid-cols-[140px_1fr_140px_1fr] gap-y-16 p-16">
      <p className="text-16">요청인</p>
      <p className="text-16">{requester.name}</p>
      <p className="text-16">요청 날짜</p>
      <DateText date={createdAt} className="text-16" />
    </div>
    {requestMessage && (
      <div className="grid grid-cols-[140px_3fr] gap-y-16 p-16">
        <p className="text-16">요청 메시지</p>
        <p className="text-16">{requestMessage}</p>
      </div>
    )}
  </div>
);

// ApprovedInfo 섹션
interface ApprovedInfoProps {
  approver?: PurchaseRequestItem['approver'];
  updatedAt: string;
  status: PurchaseRequestItem['status'];
  rejectReason?: string;
}

const ApprovedInfoMobile: React.FC<ApprovedInfoProps> = ({
  approver,
  updatedAt,
  status,
  rejectReason,
}) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-14 py-14">승인 정보</h1>
    <Divider orientation="horizontal" variant="thick" />
    <div className="flex items-center text-14 p-16">
      <p className="w-140">담당자</p>
      <p>{approver?.name || '-'}</p>
    </div>
    <Divider orientation="horizontal" variant="thin" />
    <div className="flex items-center text-14 p-16">
      <p className="w-140">승인 날짜</p>
      {approver ? <DateText date={updatedAt} /> : <p>-</p>}
    </div>
    <Divider orientation="horizontal" variant="thin" />
    <div className="flex items-start text-14 h-142 overflow-scroll p-16">
      <p className="w-140">상태</p>
      <p>{getStatusLabel(status)}</p>
    </div>
    <Divider orientation="horizontal" variant="thin" />
    <div className="flex items-start text-14 h-142 overflow-scroll p-16">
      <p className="w-140">결과 메시지</p>
      <p>{rejectReason || '-'}</p>
    </div>
  </div>
);

const ApprovedInfoTablet: React.FC<ApprovedInfoProps> = ({
  approver,
  updatedAt,
  status,
  rejectReason,
}) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-16 py-14">승인 정보</h1>
    <Divider orientation="horizontal" variant="thick" />
    <div className="grid grid-cols-[140px_1fr_140px_1fr] gap-y-16 p-16">
      <p className="text-16">담당자</p>
      <p className="text-16">{approver?.name || '-'}</p>
      <p className="text-16">승인 날짜</p>
      {approver ? <DateText date={updatedAt} className="text-16" /> : <p className="text-16">-</p>}
      <p className="text-16">상태</p>
      <p className="text-16">{getStatusLabel(status)}</p>
      <p className="text-16">결과 메시지</p>
      <p className="text-16 col-span-3">{rejectReason || '-'}</p>
    </div>
  </div>
);

const ApprovedInfoDesktop: React.FC<ApprovedInfoProps> = ({
  approver,
  updatedAt,
  status,
  rejectReason,
}) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-16 py-14">승인 정보</h1>
    <Divider orientation="horizontal" variant="thick" />
    <div className="grid grid-cols-[140px_1fr_140px_1fr] gap-y-16 p-16">
      <p className="text-16">담당자</p>
      <p className="text-16">{approver?.name || '-'}</p>
      <p className="text-16">승인 날짜</p>
      {approver ? <DateText date={updatedAt} className="text-16" /> : <p className="text-16">-</p>}
      <p className="text-16">상태</p>
      <p className="text-16">{getStatusLabel(status)}</p>
      <p className="text-16">결과 메시지</p>
      <p className="text-16 col-span-3">{rejectReason || '-'}</p>
    </div>
  </div>
);

// ActionButtons 섹션
const ActionButtonsMobileTablet: React.FC = () => (
  <div className="fixed bottom-0 left-0 right-0 flex justify-center items-center w-full gap-16 text-16 bg-white p-16 border-t border-gray-200">
    <Button variant="secondary" size="sm" className="flex-1 max-w-338 h-50">
      목록 보기
    </Button>
    <Button variant="primary" size="sm" className="flex-1 max-w-338 h-50">
      장바구니 다시 담기
    </Button>
  </div>
);

const ActionButtonsDesktop: React.FC = () => (
  <div className="flex justify-center items-center w-full gap-16 text-16">
    <Button variant="secondary" size="sm" className="flex-1 max-w-338 h-50">
      목록 보기
    </Button>
    <Button variant="primary" size="sm" className="flex-1 max-w-338 h-50">
      장바구니 다시 담기
    </Button>
  </div>
);

// 메인 컴포넌트
const MyRequestDetailsOrg: React.FC<MyRequestDetailsOrgProps> = ({ purchaseRequest }) => (
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
      <ApprovedInfoMobile
        approver={purchaseRequest.approver}
        updatedAt={purchaseRequest.updatedAt}
        status={purchaseRequest.status}
        rejectReason={purchaseRequest.rejectReason}
      />
      <div className="h-82" />
      <ActionButtonsMobileTablet />
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
      <ApprovedInfoTablet
        approver={purchaseRequest.approver}
        updatedAt={purchaseRequest.updatedAt}
        status={purchaseRequest.status}
        rejectReason={purchaseRequest.rejectReason}
      />
      <div className="h-82" />
      <ActionButtonsMobileTablet />
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
      <ApprovedInfoDesktop
        approver={purchaseRequest.approver}
        updatedAt={purchaseRequest.updatedAt}
        status={purchaseRequest.status}
        rejectReason={purchaseRequest.rejectReason}
      />
      <ActionButtonsDesktop />
    </div>
  </>
);

export default MyRequestDetailsOrg;
