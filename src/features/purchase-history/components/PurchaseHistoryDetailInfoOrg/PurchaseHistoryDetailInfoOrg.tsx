'use client';

import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import { Divider } from '@/components/atoms/Divider/Divider';
import DateText from '@/components/atoms/DateText/DateText';
import type { ReactNode } from 'react';

interface PurchaseHistoryDetailInfoOrgProps {
  purchaseRequest: PurchaseRequestItem;
  approvedInfo: {
    approverName: string;
    approvalDate: string | null;
    statusLabel: string;
    resultMessage: string;
  };
}

// 공통 InfoSection 컴포넌트
interface InfoSectionProps {
  title: string;
  children: ReactNode;
}

const InfoSection = ({ title, children }: InfoSectionProps) => (
  <div className="flex flex-col">
    <h2 className="font-bold text-14 tablet:text-16 py-14">{title}</h2>
    <Divider orientation="horizontal" variant="thick" />
    {children}
  </div>
);

// 두 컬럼 InfoRow (반응형)
interface InfoRowTwoColumnsProps {
  label1: string;
  value1: ReactNode;
  label2: string;
  value2: ReactNode;
}

const InfoRowTwoColumns = ({ label1, value1, label2, value2 }: InfoRowTwoColumnsProps) => (
  <>
    {/* Mobile: 두 행으로 분리 */}
    <div className="grid grid-cols-[140px_1fr] border-b border-gray-100 tablet:hidden">
      <p className="text-14 border-r border-gray-100 py-8 px-16 tablet:px-20">{label1}</p>
      <p className="text-14 py-8 px-16 tablet:px-20">{value1}</p>
    </div>
    <div className="grid grid-cols-[140px_1fr] border-b border-gray-100 tablet:hidden">
      <p className="text-14 border-r border-gray-100 py-8 px-16 tablet:px-20">{label2}</p>
      <p className="text-14 py-8 px-16 tablet:px-20">{value2}</p>
    </div>

    {/* Tablet/Desktop: 한 행에 2x2 그리드 */}
    <div className="hidden tablet:grid grid-cols-[140px_1fr_140px_1fr] border-b border-gray-100">
      <p className="text-16 border-r border-gray-100 py-8 px-20">{label1}</p>
      <p className="text-16 border-r border-gray-100 py-8 px-20">{value1}</p>
      <p className="text-16 border-r border-gray-100 py-8 px-20">{label2}</p>
      <p className="text-16 py-8 px-20">{value2}</p>
    </div>
  </>
);

// 단일 행 InfoRow (전체 너비)
interface InfoRowSingleProps {
  label: string;
  value: ReactNode;
  fullWidth?: boolean;
}

const InfoRowSingle = ({ label, value, fullWidth = false }: InfoRowSingleProps) => (
  <div
    className={`grid ${fullWidth ? 'grid-cols-[140px_3fr]' : 'grid-cols-[140px_1fr]'} border-b border-gray-100`}
  >
    <p className="text-14 tablet:text-16 border-r border-gray-100 py-8 px-16 tablet:px-20">
      {label}
    </p>
    <p className="text-14 tablet:text-16 py-8 px-16 tablet:px-20 wrap-break-word">{value}</p>
  </div>
);

// RequestInfo 섹션
interface RequestInfoProps {
  requester: PurchaseRequestItem['requester'];
  createdAt: string;
  requestMessage?: string;
}

const RequestInfo = ({ requester, createdAt, requestMessage }: RequestInfoProps) => (
  <div className="pt-30">
    <InfoSection title="요청 정보">
      <InfoRowTwoColumns
        label1="요청인"
        value1={requester.name}
        label2="요청 날짜"
        value2={<DateText date={createdAt} className="text-14 tablet:text-16" />}
      />
      {requestMessage && <InfoRowSingle label="요청 메시지" value={requestMessage} fullWidth />}
    </InfoSection>
  </div>
);

// ApprovedInfo 섹션
interface ApprovedInfoProps {
  approverName: string;
  approvalDate: string | null;
  statusLabel: string;
  resultMessage: string;
}

const ApprovedInfo = ({
  approverName,
  approvalDate,
  statusLabel,
  resultMessage,
}: ApprovedInfoProps) => (
  <InfoSection title="승인 정보">
    <InfoRowTwoColumns
      label1="담당자"
      value1={approverName}
      label2="승인 날짜"
      value2={
        approvalDate ? <DateText date={approvalDate} className="text-14 tablet:text-16" /> : '-'
      }
    />
    <InfoRowTwoColumns
      label1="상태"
      value1={statusLabel}
      label2="결과 메시지"
      value2={resultMessage}
    />
  </InfoSection>
);

// 메인 컴포넌트
const PurchaseHistoryDetailInfoOrg = ({
  purchaseRequest,
  approvedInfo,
}: PurchaseHistoryDetailInfoOrgProps) => (
  <div className="flex flex-col gap-30 w-full px-24 tablet:px-0 tablet:w-696 desktop:w-1200 desktop:mx-0">
    <RequestInfo
      requester={purchaseRequest.requester}
      createdAt={purchaseRequest.createdAt}
      requestMessage={purchaseRequest.requestMessage}
    />
    <ApprovedInfo
      approverName={approvedInfo.approverName}
      approvalDate={approvedInfo.approvalDate}
      statusLabel={approvedInfo.statusLabel}
      resultMessage={approvedInfo.resultMessage}
    />
  </div>
);

export default PurchaseHistoryDetailInfoOrg;
