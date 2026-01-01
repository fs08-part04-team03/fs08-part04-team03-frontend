import AuthHeader from '@/components/organisms/AuthHeader/AuthHeader';

const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <AuthHeader />
    {children}
  </>
);

export default AuthLayout;
