'use client';

import { useState, useEffect, useRef } from 'react';
import Button from '@/components/atoms/Button/Button';
import { clsx } from '@/utils/clsx';

/**
 * 회사 정보 타입
 */
interface Company {
  /** 회사 고유 ID */
  id: string;
  /** 회사명 */
  name: string;
}

/**
 * CompanySelectionModal Props
 */
interface CompanySelectionModalProps {
  /** 모달 표시 여부 */
  open: boolean;
  /** 선택 가능한 회사 목록 */
  companies: Company[];
  /** 회사 선택 시 호출되는 콜백 (선택된 companyId 전달) */
  onSelect: (companyId: string) => void;
  /** 모달 닫기 콜백 */
  onClose: () => void;
  /** 로딩 상태 (로그인 진행 중일 때 true) */
  isLoading?: boolean;
}

/**
 * CompanySelectionModal
 *
 * 사용자가 여러 회사에 가입되어 있을 때 로그인할 회사를 선택하는 모달.
 * - 회사 목록을 클릭 가능한 리스트로 표시
 * - 첫 번째 회사가 기본 선택됨
 * - ESC 키 또는 dimmed 영역 클릭으로 닫기 가능
 * - 로딩 중에는 상호작용 비활성화
 */
const CompanySelectionModal = ({
  open,
  companies,
  onSelect,
  onClose,
  isLoading = false,
}: CompanySelectionModalProps) => {
  // 현재 선택된 회사 ID
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  // 모달 컨테이너 ref (dimmed 영역 클릭 감지용)
  const modalRef = useRef<HTMLDivElement | null>(null);

  // 모달이 열릴 때 첫 번째 회사를 기본 선택
  useEffect(() => {
    if (open && companies.length > 0 && !selectedCompanyId) {
      const firstCompany = companies[0];
      if (firstCompany) {
        setSelectedCompanyId(firstCompany.id);
      }
    }
  }, [open, companies, selectedCompanyId]);

  // 모달이 닫힐 때 선택 상태 초기화
  useEffect(() => {
    if (!open) {
      setSelectedCompanyId(null);
    }
  }, [open]);

  // ESC 키로 모달 닫기 (로딩 중이 아닐 때만)
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) onClose();
    };
    if (open) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose, isLoading]);

  // dimmed 영역(모달 외부) 클릭 시 모달 닫기
  const handleDimmedClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node) && !isLoading) {
      onClose();
    }
  };

  // 로그인 버튼 클릭 핸들러
  const handleLoginClick = () => {
    if (selectedCompanyId && !isLoading) {
      onSelect(selectedCompanyId);
    }
  };

  // 모달이 닫혀있으면 렌더링하지 않음
  if (!open) return null;

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50 flex items-center justify-center',
        'bg-black/50 backdrop-blur-sm'
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby="company-selection-title"
    >
      <div
        role="button"
        tabIndex={0}
        aria-label="모달 닫기"
        className="absolute inset-0"
        onClick={handleDimmedClick}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !isLoading) onClose();
        }}
      />

      <div
        ref={modalRef}
        role="presentation"
        className={clsx(
          'relative bg-white rounded-default w-327 h-auto p-20 flex flex-col',
          'tablet:w-512 tablet:p-30',
          'desktop:w-512 desktop:p-30'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center gap-8 mb-24">
          <h2
            id="company-selection-title"
            className={clsx(
              'text-18 text-center font-bold text-black-400',
              'tablet:text-20 desktop:text-20'
            )}
          >
            회사 선택
          </h2>
          <p className="text-14 text-gray-600 text-center tablet:text-16 desktop:text-16">
            로그인할 회사를 선택해주세요.
          </p>
        </div>

        <div className="flex flex-col gap-8 mb-24 max-h-240 overflow-y-auto">
          {companies.map((company) => (
            <button
              key={company.id}
              type="button"
              disabled={isLoading}
              onClick={() => setSelectedCompanyId(company.id)}
              className={clsx(
                'w-full p-16 rounded-default text-left transition-all duration-200',
                'text-14 tablet:text-16 desktop:text-16',
                'border-2',
                selectedCompanyId === company.id
                  ? 'border-primary-500 bg-primary-50 text-primary-700 font-semibold'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50',
                isLoading && 'opacity-50 cursor-not-allowed'
              )}
            >
              {company.name}
            </button>
          ))}
        </div>

        <div className="flex gap-10 tablet:gap-20 desktop:gap-20">
          <Button
            variant="primary"
            className={clsx(
              'w-139 h-50 cursor-pointer text-14 rounded-default',
              'tablet:w-216 tablet:h-64 tablet:text-16',
              'desktop:w-216 desktop:h-64 desktop:text-16'
            )}
            onClick={handleLoginClick}
            inactive={!selectedCompanyId || isLoading}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </Button>

          <Button
            variant="secondary"
            className={clsx(
              'w-139 h-50 border-l border-gray-200 cursor-pointer text-14 rounded-default',
              'tablet:w-216 tablet:h-64 tablet:text-16',
              'desktop:w-216 desktop:h-64 desktop:text-16'
            )}
            onClick={onClose}
            inactive={isLoading}
          >
            취소
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanySelectionModal;
