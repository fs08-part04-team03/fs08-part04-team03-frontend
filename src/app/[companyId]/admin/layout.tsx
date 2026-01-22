import { ReactNode } from 'react';
import type { Metadata } from 'next';

import { RoleGuard } from '@/components/guards/RoleGuard';

export const metadata: Metadata = {
  title: '관리자',
  description: '서비스 관리자 페이지',
  robots: {
    index: true,
    follow: true,
  },
};

const AdminLayout = ({ children }: { children: ReactNode }) => (
  // admin role guard
  <RoleGuard requiredRole="admin">{children}</RoleGuard>
);

export default AdminLayout;
