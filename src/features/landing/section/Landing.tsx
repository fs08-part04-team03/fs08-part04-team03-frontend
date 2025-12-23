'use client';

import { useEffect } from 'react';
import LandingTem from '../template/LandingTem';

const LANDING_MARQUEE_ITEMS = [
  { id: 1, text: '흩어진 간식 구매처를 통합하고,\n기수별 지출을 똑똑하게 관리하세요.' },
  { id: 2, text: '관리자와 유저\n모두 이용할 수 있어요.' },
  { id: 3, text: '다양한 품목도\n한 눈에 파악해봐요.' },
  { id: 4, text: '쉽고 빠르게\n구매를 요청해보세요.' },
  { id: 5, text: '여러 플랫폼에서 구매한 간식 내역을\n한 곳에서 쉽게 관리해요' },
];

const Landing = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return <LandingTem marqueeItems={LANDING_MARQUEE_ITEMS} />;
};

export default Landing;
