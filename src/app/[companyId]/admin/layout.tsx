import { ReactNode } from 'react';
import { Metadata } from 'next';
import { RoleGuard } from '@/components/guards/RoleGuard';

export const metadata: Metadata = {
  title: 'SNACK 관리자',
  description: 'SNACK 서비스 관리자 페이지',
};

const AdminLayout = ({ children }: { children: ReactNode }) => (
  // admin role guard
  <RoleGuard requiredRole="admin">
    <div>{children}</div>
  </RoleGuard>
);

export default AdminLayout;
