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
      <picture>
        <source media="(min-width: 1024px)" srcSet="/images/landing-desktop.svg" />
        <source media="(min-width: 768px)" srcSet="/images/landing-tablet.svg" />
        <Image
          src="/images/landing-mobile.svg"
          alt="Snack App Interface"
          className="
                w-full 
                max-w-375 tablet:max-w-768 desktop:max-w-1240
                h-auto object-cover"
          width={1240}
          height={100}
        />
      </picture>
    </div>
    <div className="fixed bottom-0 w-full -z-toast">
      <LandingMarqueeOrgn items={marqueeItems} />
    </div>
  </div>
);

export default LandingTem;
