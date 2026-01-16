'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useParams } from 'next/navigation';

interface CompanyContextValue {
  companyId: string;
}

const CompanyContext = createContext<CompanyContextValue | undefined>(undefined);

/**
 * CompanyProvider - companyId를 Context로 제공
 * Layout에서 사용하여 하위 컴포넌트에서 companyId를 직접 접근 가능하게 함
 */
export const CompanyProvider = ({ children }: { children: ReactNode }) => {
  const params = useParams();
  const companyId = (params?.companyId as string) || '';

  const value = useMemo(() => ({ companyId }), [companyId]);

  return <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>;
};

/**
 * useCompanyId - companyId를 Context에서 가져오는 훅
 * Props drilling 없이 어디서든 companyId에 접근 가능
 */
export const useCompanyId = (): string => {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    // Context가 없을 경우 fallback으로 useParams 사용
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const params = useParams();
    return (params?.companyId as string) || '';
  }
  return context.companyId;
};
