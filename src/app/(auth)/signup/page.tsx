import { Metadata } from 'next';

import SignupSection from '@/features/auth/section/SignupSection';

export const metadata: Metadata = {
  title: '회원가입',
  robots: {
    index: true,
    follow: true,
  },
};

const SignupPage = () => <SignupSection />;

export default SignupPage;
