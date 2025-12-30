import { redirect } from 'next/navigation';

import InviteSignup from '@/features/auth/section/InviteSignup';
import { PATHNAME } from '@/constants';

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
