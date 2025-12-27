'use client';

import React from 'react';

import { clsx } from '@/utils/clsx';
import GNBBrand from '@/components/molecules/GNBBrand/GNBBrand';
import { AuthUserActions } from '@/components/molecules/AuthUserActions/AuthUserActions';

interface AuthHeaderProps {
  className?: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ className }) => (
  <div
    className={clsx(
      'auth-header-container',
      'sticky top-0 z-header',
      'w-full h-56',
      'bg-white border-b border-gray-200',
      'flex items-center justify-between',
      'px-14 tablet:px-24',
      className
    )}
  >
    {/* 왼쪽: Brand (기존 Molecule 재사용) */}
    <div className="flex items-center shrink-0">
      <GNBBrand />
    </div>

    {/* 오른쪽: Auth User Actions */}
    <AuthUserActions />
  </div>
);

export default AuthHeader;
