import { ReactNode } from 'react';
import { RoleGuard } from '@/components/guards/RoleGuard';

const AdminLayout = ({ children }: { children: ReactNode }) => (
  // admin role guard
  <RoleGuard requiredRole="admin">
    <div>{children}</div>
  </RoleGuard>
);

export default AdminLayout;
