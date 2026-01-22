import { Metadata } from 'next';

import LoginSection from '@/features/auth/section/LoginSection';

export const metadata: Metadata = {
  title: '로그인',
};

const LoginPage = () => <LoginSection />;

export default LoginPage;
