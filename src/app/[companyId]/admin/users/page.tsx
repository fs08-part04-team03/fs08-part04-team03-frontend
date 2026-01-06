import type { Metadata } from 'next';

import { AdminUserSection } from '@/features/admin/users/section';

export const metadata: Metadata = {
  title: 'SNACK 관리자 - 사용자 관리',
  description: '우리 회사 사용자 정보와 권한을 손쉽게 관리하세요.',
};

// 어드민 - 사용자 관리 페이지
const UserManagementPage = () => (
  <div>
    <AdminUserSection />
  </div>
);

export default UserManagementPage;
