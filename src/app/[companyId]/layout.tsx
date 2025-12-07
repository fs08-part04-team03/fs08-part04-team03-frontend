import { ReactNode } from 'react';

const Companylayout = ({ children }: { children: ReactNode }) => (
  <div>
    <p>Companylayout- 회사 레이아웃 페이지</p>
    {children}
  </div>
);

export default Companylayout;
