import type { Metadata } from 'next';

import ProfileEditSection from '@/features/profile/section/ProfileEditSection';
import {
  fetchCompanyForMetadata,
  fetchUserForMetadata,
} from '@/lib/metadata-helpers';

export async function generateMetadata(): Promise<Metadata> {
  const [company, user] = await Promise.all([
    fetchCompanyForMetadata(),
    fetchUserForMetadata(),
  ]);

  const userName = user?.name || '사용자';
  const title = `${userName}의 프로필`;

  return {
    title,
    description: `${company.name} - ${userName}님의 프로필 정보를 수정하세요.`,
  };
}

const ProfilePage = () => <ProfileEditSection />;

export default ProfilePage;
