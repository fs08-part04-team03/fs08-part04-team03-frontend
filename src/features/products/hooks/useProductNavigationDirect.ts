/**
 * useProductNavigationDirect
 * Props Depth 1단계 달성을 위한 직접 접근 훅
 * companyId를 Context에서 가져와서 상품 네비게이션 직접 처리
 */

import { useCompanyId } from '@/lib/context/CompanyContext';
import { useProductNavigation } from '../handlers/useProductNavigation';

/**
 * 상품 네비게이션을 직접 처리하는 훅
 * companyId를 Context에서 가져와서 사용
 */
export const useProductNavigationDirect = () => {
  const companyId = useCompanyId();
  // companyId가 빈 문자열일 경우 undefined로 전달하여 유효하지 않은 경로 생성 방지
  return useProductNavigation(companyId || undefined);
};
