'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PATHNAME } from '@/constants';
import { SignupButton } from '@/components/atoms/Button/Button';

const LandingHero = () => {
  const router = useRouter();

  const handleSignup = () => {
    router.push(PATHNAME.SIGNUP);
  };

  return (
    <section className="relative w-full pt-80 pb-60 bg-white">
      <div className="flex flex-col items-center px-4 text-center">
        {/* 메인 텍스트 */}
        <h1
          className="
            text-20 tablet:text-32 desktop:text-50 
            font-extrabold
            leading-normal desktop:leading-140 
            tracking--0.5 tablet:tracking--0.8 desktop:tracking--1.25 
            text-gray-950
            mb-12 desktop:mb-14
            break-keep"
        >
          내가 원하는 간식을 쉽고 빠르게 구매
        </h1>

        {/* 서브 텍스트 */}
        <p
          className="
            text-16 tablet:text-20 desktop:text-24
            font-bold
            leading-normal
            tracking--0.5 desktop:tracking--0.6
            text-gray-300
            mb-30 tablet:mb-40 desktop:mb-30"
        >
          with Snack
        </p>

        {/* CTA 버튼 */}
        <SignupButton
          onClick={handleSignup}
          className="
            !w-110 tablet:!w-130 desktop:!w-130
            !px-16 tablet:!px-20 desktop:!px-20
            !text-14 tablet:!text-16 desktop:!text-16
            tracking--0.35 tablet:tracking--0.4 desktop:tracking--0.4
            whitespace-nowrap"
          rightIcon={
            <Image
              src="/icons/arrow-right-up.svg"
              alt=""
              width={16}
              height={16}
              className="shrink-0 w-16 h-16"
            />
          }
        >
          Sign Now
        </SignupButton>
      </div>
    </section>
  );
};

export default LandingHero;
