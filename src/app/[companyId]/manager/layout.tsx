import { ReactNode } from 'react';

const ManagerLayout = ({ children }: { children: ReactNode }) => (
  <div>
    <p>ManagerLayout-관리자 공통 레이아웃</p>
    {children}
  </div>
);

export default ManagerLayout;
