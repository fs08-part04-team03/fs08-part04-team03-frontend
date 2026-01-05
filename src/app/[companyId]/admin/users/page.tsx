import type { Metadata } from 'next';

import { AdminUserSection } from '@/features/admin/users/section';

export const metadata: Metadata = {
  title: '회원 관리',
};

// 어드민 - 사용자 관리 페이지
const UserManagementPage = () => (
  <div>
    <AdminUserSection />
  </div>
);

export default UserManagementPage;
