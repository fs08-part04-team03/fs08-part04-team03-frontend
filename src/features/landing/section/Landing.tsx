import LandingHero from '../components/LandingHeroOrg/LandingHeroOrgn';

const Landing = () => (
  <div className="flex flex-col items-center w-full overflow-hidden bg-white">
    <LandingHero />

    {/* 반응형 이미지 (mobile, tablet, desktop에 따라 다른 이미지 사용) */}
    <div className="w-full flex justify-center px-4 pb-20">
      <picture>
        <source media="(min-width: 1024px)" srcSet="/images/landing-desktop.svg" />
        <source media="(min-width: 768px)" srcSet="/images/landing-tablet.svg" />
        <img
          src="/images/landing-mobile.svg"
          alt="Snack App Interface"
          className="
              w-full 
              max-w-[375px] tablet:max-w-[768px] desktop:max-w-[1240px]
              h-auto object-cover"
        />
      </picture>
    </div>
  </div>
);

export default Landing;
