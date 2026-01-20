'use client';

import { useState, useEffect } from 'react';
import { clsx } from '@/utils/clsx';
import Button from '@/components/atoms/Button/Button';

export interface ExcelExportParams {
  from: string;
  to: string;
  status?: 'APPROVED' | 'REJECTED';
  role?: 'USER' | 'MANAGER' | 'ADMIN' | 'ALL';
}

interface ExcelExportModalProps {
  open: boolean;
  onClose: () => void;
  onExport: (params: ExcelExportParams) => void | Promise<void>;
  isLoading?: boolean;
}

const STATUS_OPTIONS = [
  { value: '', label: '전체' },
  { value: 'APPROVED', label: '승인' },
  { value: 'REJECTED', label: '거절' },
] as const;

const ROLE_OPTIONS = [
  { value: '', label: '전체' },
  { value: 'USER', label: '일반 사용자' },
  { value: 'MANAGER', label: '매니저' },
  { value: 'ADMIN', label: '관리자' },
] as const;

/**
 * date input 포맷에 맞는 날짜 문자열 반환 (YYYY-MM-DD)
 */
const getLocalDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 기본 시작일: 이번 달 1일 00:00
const getDefaultFromDate = (): string => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  return getLocalDateString(firstDay);
};

// 기본 종료일: 현재 시간
const getDefaultToDate = (): string => getLocalDateString(new Date());

export const ExcelExportModal = ({
  open,
  onClose,
  onExport,
  isLoading = false,
}: ExcelExportModalProps) => {
  const [fromDate, setFromDate] = useState(getDefaultFromDate);
  const [toDate, setToDate] = useState(getDefaultToDate);
  const [status, setStatus] = useState('');
  const [role, setRole] = useState('');

  // 모달이 열릴 때 날짜 초기화
  useEffect(() => {
    if (open) {
      setFromDate(getDefaultFromDate());
      setToDate(getDefaultToDate());
      setStatus('');
      setRole('');
    }
  }, [open]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) onClose();
    };
    if (open) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose, isLoading]);

  if (!open) return null;

  const isValid = fromDate && toDate && new Date(fromDate) <= new Date(toDate);

  const handleExport = () => {
    if (!isValid || isLoading) return;

    // date(YYYY-MM-DD) -> ISO 8601 변환 (시작일: 00:00:00, 종료일: 23:59:59)
    const params: ExcelExportParams = {
      from: new Date(`${fromDate}T00:00:00`).toISOString(),
      to: new Date(`${toDate}T23:59:59`).toISOString(),
    };

    if (status) {
      params.status = status as 'APPROVED' | 'REJECTED';
    }
    if (role) {
      params.role = role as 'USER' | 'MANAGER' | 'ADMIN' | 'ALL';
    }

    Promise.resolve(onExport(params)).catch(() => undefined);
  };

  const inputClassName = clsx(
    'w-full h-44 px-12',
    'border border-gray-200 rounded-8',
    'text-14 text-gray-900',
    'focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary',
    'disabled:bg-gray-50 disabled:cursor-not-allowed'
  );

  const labelClassName = 'block text-14 font-medium text-gray-700 mb-6';

  return (
    <div
      className="fixed inset-0 z-[var(--z-overlay-content)] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-16 p-24 w-full max-w-400 shadow-xl m-16">
        <h2 className="text-18 font-bold text-gray-900 mb-16">엑셀 리포트 다운로드</h2>

        <p className="text-14 text-gray-600 mb-20">
          구매 요청 승인/거절 내역을 엑셀 파일로 다운로드합니다.
        </p>

        {/* 날짜 입력 */}
        {/* eslint-disable jsx-a11y/label-has-associated-control */}
        <div className="space-y-16 mb-20">
          {/* 시작일 */}
          <div>
            <label htmlFor="excel-from-date" className={labelClassName}>
              시작일 <span className="text-error-500">*</span>
            </label>
            <input
              id="excel-from-date"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className={inputClassName}
              disabled={isLoading}
            />
          </div>

          {/* 종료일 */}
          <div>
            <label htmlFor="excel-to-date" className={labelClassName}>
              종료일 <span className="text-error-500">*</span>
            </label>
            <input
              id="excel-to-date"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className={inputClassName}
              disabled={isLoading}
            />
          </div>

          {/* 상태 필터 */}
          <div>
            <label htmlFor="excel-status" className={labelClassName}>
              결정 상태
            </label>
            <select
              id="excel-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={inputClassName}
              disabled={isLoading}
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* 역할 필터 */}
          <div>
            <label htmlFor="excel-role" className={labelClassName}>
              요청자 역할
            </label>
            <select
              id="excel-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={inputClassName}
              disabled={isLoading}
            >
              {ROLE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 날짜 유효성 에러 */}
        {fromDate && toDate && new Date(fromDate) > new Date(toDate) && (
          <p className="text-12 text-error-500 mb-12">종료일은 시작일 이후여야 합니다.</p>
        )}

        {/* 버튼 */}
        <div className="flex justify-end gap-10">
          <Button
            variant="secondary"
            className="w-80 h-40 text-14"
            onClick={onClose}
            inactive={isLoading}
          >
            취소
          </Button>
          <Button
            variant="primary"
            className="w-100 h-40 text-14"
            onClick={handleExport}
            inactive={!isValid || isLoading}
          >
            {isLoading ? '다운로드 중...' : '다운로드'}
          </Button>
        </div>
      </div>
    </div>
  );
};
