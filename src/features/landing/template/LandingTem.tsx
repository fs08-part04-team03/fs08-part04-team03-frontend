'use client';

import Image from 'next/image';
import LandingHero from '../components/LandingHeroOrg/LandingHeroOrgn';
import { LandingMarqueeOrgn, MarqueeItem } from '../components/LandingMarquee/LandingMarqueeOrgn';

interface LandingTemProps {
  marqueeItems: MarqueeItem[];
}

const LandingTem = ({ marqueeItems }: LandingTemProps) => (
  <div className="relative flex flex-col items-center w-full h-screen overflow-hidden bg-white">
    <LandingHero />
    {/* 반응형 이미지 (mobile, tablet, desktop에 따라 다른 이미지 사용) */}
    <div className="w-full flex justify-center px-4 pb-20">
      <Image
        src="/images/landing-full-mobile.svg"
        alt="Snack App Interface"
        className="
              w-full 
              max-w-375 tablet:max-w-768 desktop:max-w-1240
              h-auto object-cover
              block tablet:hidden"
        width={375}
        height={100}
      />
      <Image
        src="/images/landing-full-tablet.svg"
        alt="Snack App Interface"
        className="
              w-full 
              max-w-768
              h-auto object-cover
              hidden tablet:block desktop:hidden"
        width={768}
        height={100}
      />
      <Image
        src="/images/landing-full-desktop.svg"
        alt="Snack App Interface"
        className="
              w-full 
              max-w-1240
              h-auto object-cover
              hidden desktop:block"
        width={1240}
        height={100}
      />
    </div>
    <div className="fixed bottom-0 w-full -z-toast">
      <LandingMarqueeOrgn items={marqueeItems} />
    </div>
  </div>
);

export default LandingTem;
