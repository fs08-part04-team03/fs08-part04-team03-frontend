import { ReactNode } from 'react';
import { RoleGuard } from '@/components/auth/RoleGuard';

const ManagerLayout = ({ children }: { children: ReactNode }) => (
  <RoleGuard requiredRole="manager">
    <div>
      <p>ManagerLayou - 관리자 공통 레이아웃</p>
      {children}
    </div>
  </RoleGuard>
);

export default ManagerLayout;
