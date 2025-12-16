'use client';

import Image from 'next/image';
import Button from '@/components/atoms/Button/Button';
import { clsx } from '@/utils/clsx';

interface StatusNoticeProps {
  icon?: string;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
  hideButton?: boolean;
}

const StatusNotice = ({
  icon = '/icons/book.svg',
  title,
  description,
  buttonText = '',
  onButtonClick,
  hideButton = false,
}: StatusNoticeProps) => (
  <div
    className={clsx(
      'mobile:w-375 mobile:h-300 mobile:px-24 mobile:flex mobile:flex-col mobile:items-center',
      'tablet:w-310 tablet:h-336 tablet:px-0'
    )}
  >
    {/* 아이콘 */}
    <Image
      src={icon}
      alt=""
      width={36}
      height={43}
      className={clsx('mobile:mt-30 mobile:mb-41', 'tablet:mb-50')}
    />

    {/* 제목 */}
    <h2
      className={clsx(
        'mobile:text-gray-primary-950 mobile:text-18 mobile:font-extrabold mobile:tracking--0.45 mobile:text-center mobile:mb-10',
        'tablet:text-gray-primary-950 tablet:text-24 tablet:font-extrabold tablet:tracking--0.6 tablet:text-center tablet:mb-12'
      )}
    >
      {title}
    </h2>

    {/* 설명 */}
    <p
      className={clsx(
        'mobile:text-gray-primary-800 mobile:text-14 mobile:font-normal mobile:tracking--0.35 mobile:leading-160 mobile:whitespace-pre-line mobile:text-center mobile:mb-40',
        'tablet:text-gray-primary-800 tablet:text-16 tablet:font-normal tablet:tracking--0.4 tablet:leading-160 tablet:text-center tablet:mb-48'
      )}
    >
      {description}
    </p>

    {/* 버튼 */}
    {!hideButton && (
      <Button
        size="lg"
        variant="primary"
        className={clsx(
          'mobile:w-327 mobile:h-64 mobile:cursor-pointer',
          'tablet:w-310 tablet:h-64 tablet:cursor-pointer'
        )}
        onClick={onButtonClick}
      >
        {buttonText}
      </Button>
    )}
  </div>
);

export default StatusNotice;
