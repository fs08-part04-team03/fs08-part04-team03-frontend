import { ReactNode } from 'react';

const AdminLayout = ({ children }: { children: ReactNode }) => (
  <div>
    <p>AdminLayout- 최고관리자 레이아웃 페이지</p>
    {children}
  </div>
);

export default AdminLayout;
