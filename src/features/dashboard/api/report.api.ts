'use client';

import { fetchWithAuth } from '@/utils/api';

// 구매 요청 승인/거절 리포트 엑셀 다운로드
export const REPORT_API_PATHS = {
  EXPORT_PURCHASE_REQUESTS: '/api/v1/report/admin/exportPurchaseRequests',
} as const;

// 구매 요청 엑셀 내보내기 파라미터
export interface ExportPurchaseRequestsParams {
  /** 결정 시작 일시 (ISO 8601) */
  from: string;
  /** 결정 종료 일시 (ISO 8601) */
  to: string;
  /** 결정 상태 필터 (선택) */
  status?: 'APPROVED' | 'REJECTED';
  /** 요청자 역할 필터 (선택) */
  role?: 'USER' | 'MANAGER' | 'ADMIN' | 'ALL';
}

/**
 * 구매 요청 승인/거절 리포트 엑셀 다운로드 (관리자)
 * GET /api/v1/report/admin/exportPurchaseRequests
 *
 * @param params 필터 파라미터
 * @returns Blob (엑셀 파일)
 */
export const exportPurchaseRequests = async (
  params: ExportPurchaseRequestsParams
): Promise<Blob> => {
  const searchParams = new URLSearchParams({
    from: params.from,
    to: params.to,
  });

  if (params.status) {
    searchParams.append('status', params.status);
  }
  if (params.role) {
    searchParams.append('role', params.role);
  }

  const url = `${REPORT_API_PATHS.EXPORT_PURCHASE_REQUESTS}?${searchParams.toString()}`;

  const response = await fetchWithAuth(url, {
    method: 'GET',
  });

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as { message?: string };
    throw new Error(errorData.message || '엑셀 다운로드에 실패했습니다.');
  }

  return response.blob();
};

/**
 * Blob을 파일로 다운로드
 * @param blob 다운로드할 Blob
 * @param filename 저장할 파일명
 */
export const downloadBlob = (blob: Blob, filename: string): void => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
