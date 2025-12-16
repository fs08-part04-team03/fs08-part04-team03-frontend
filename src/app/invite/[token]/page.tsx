import InviteSignup from '@/features/auth/section/InviteSignup';

interface InviteSignupPageProps {
  params: {
    token: string;
  };
}

const InviteSignupPage = ({ params }: InviteSignupPageProps) => (
  <InviteSignup token={params.token} />
);

export default InviteSignupPage;
