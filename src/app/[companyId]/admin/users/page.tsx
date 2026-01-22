import type { Metadata } from 'next';

import { AdminUserSection } from '@/features/admin/users/section';
import { PAGE_KEYWORDS } from '@/lib/metadata';

export const metadata: Metadata = {
  title: '회원 관리',
  description: '사용자 정보와 권한을 손쉽게 관리하세요.',
  keywords: PAGE_KEYWORDS.users.join(', '),
  robots: { index: true, follow: true },
  openGraph: {
    title: 'SNACK | 회원 관리',
    description: '사용자 정보와 권한을 손쉽게 관리하세요.',
    type: 'website',
    siteName: 'SNACK',
  },
};

// 어드민 - 사용자 관리 페이지
const UserManagementPage = () => (
  <div>
    <AdminUserSection />
  </div>
);

export default UserManagementPage;
