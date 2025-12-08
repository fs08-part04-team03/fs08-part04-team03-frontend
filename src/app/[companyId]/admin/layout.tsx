import { ReactNode } from 'react';
import { RoleGuard } from '@/components/auth/RoleGuard';

const AdminLayout = ({ children }: { children: ReactNode }) => (
  <RoleGuard requiredRole="admin">
    <div>
      <p>AdminLayout- 최고관리자 레이아웃 페이지</p>
      {children}
    </div>
  </RoleGuard>
);

export default AdminLayout;
