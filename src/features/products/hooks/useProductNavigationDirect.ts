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
  // Context 또는 params에서 companyId를 가져와서 사용
  // companyId가 빈 문자열일 경우에도 훅은 동작하며, 실제 사용 시점에서 유효성 검사
  return useProductNavigation(companyId);
};
