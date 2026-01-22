import type { Metadata } from 'next';

import ProfileEditSection from '@/features/profile/section/ProfileEditSection';

export const metadata: Metadata = {
  title: '내 프로필',
  description: '내 프로필 정보를 확인하고 수정하세요.',
  robots: {
    index: true,
    follow: true,
  },
};

const ProfilePage = () => <ProfileEditSection />;

export default ProfilePage;
