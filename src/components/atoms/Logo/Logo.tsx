'use client';

import Image from 'next/image';
import Link from 'next/link';
import { type ImgHTMLAttributes } from 'react';
import { clsx } from '@/utils/clsx';

type LogoSize = 'sm' | 'md' | 'lg';

export interface LogoProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'alt' | 'width' | 'height'
> {
  size?: LogoSize;
  src?: string;
  alt?: string;
  href?: string;
}

const sizeClass: Record<LogoSize, string> = {
  sm: clsx('w-70 h-20'),
  md: clsx('w-225 h-100'),
  lg: clsx('w-344 h-97'),
};

const sizeValues: Record<LogoSize, { width: number; height: number }> = {
  sm: { width: 70, height: 20 },
  md: { width: 225, height: 100 },
  lg: { width: 344, height: 97 },
};

const Logo = ({
  size = 'md',
  src = '/logo/logo.svg',
  alt = 'Logo',
  href,
  className,
}: LogoProps) => {
  const { width, height } = sizeValues[size];

  const imageElement = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={clsx(sizeClass[size], className)}
    />
  );

  if (href) {
    return <Link href={href}>{imageElement}</Link>;
  }

  return imageElement;
};

export default Logo;
