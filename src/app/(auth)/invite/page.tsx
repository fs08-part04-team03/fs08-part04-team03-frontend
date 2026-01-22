import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import InviteSignup from '@/features/auth/section/InviteSignup';
import { PATHNAME } from '@/constants';

export const metadata: Metadata = {
  title: '초대 가입',
};

interface InvitePageProps {
  searchParams: Promise<{
    token?: string;
  }>;
}

const InvitePage = async ({ searchParams }: InvitePageProps) => {
  const { token } = await searchParams;

  if (!token) {
    redirect(PATHNAME.ROOT);
  }

  return <InviteSignup token={token} />;
};

export default InvitePage;
