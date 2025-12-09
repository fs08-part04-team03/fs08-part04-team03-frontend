'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { PATHNAME } from '@/constants';
import { clsx } from '@/utils/clsx';

export interface AdminSidebarMenuItemProps {
  href: string;
  iconSrc: string;
  label: string;
  active?: boolean;
  className?: string;
}

// 모바일 메뉴 아이템 (가로 탭, 밑줄 강조)
export const AdminSidebarMenuItemMobile: React.FC<AdminSidebarMenuItemProps> = ({
  href,
  iconSrc,
  label,
  active = false,
  className,
}) => (
  <Link
    href={href}
    className={clsx(
      'flex justify-center items-center gap-8',
      'w-full h-50 px-12',
      'border-b-2 transition-colors select-none',
      active
        ? 'border-gray-950 text-gray-950'
        : 'border-gray-200 text-gray-400 hover:text-gray-900',
      className
    )}
  >
    <div className="w-25 h-25 flex items-center justify-center">
      <img src={iconSrc} alt="" className="w-20 h-20" aria-hidden="true" />
    </div>
    <span className="text-14 font-medium">{label}</span>
  </Link>
);

// 태블릿 메뉴 아이템 (가로 탭, 밑줄 강조)
export const AdminSidebarMenuItemTablet: React.FC<AdminSidebarMenuItemProps> = ({
  href,
  iconSrc,
  label,
  active = false,
  className,
}) => (
  <Link
    href={href}
    className={clsx(
      'flex justify-center items-center gap-8',
      'w-full h-50 px-12',
      'border-b-2 transition-colors select-none',
      active
        ? 'border-gray-950 text-gray-950'
        : 'border-gray-200 text-gray-400 hover:text-gray-900',
      className
    )}
  >
    <div className="w-25 h-25 flex items-center justify-center">
      <img src={iconSrc} alt="" className="w-20 h-20" aria-hidden="true" />
    </div>
    <span className="text-16 font-medium">{label}</span>
  </Link>
);

// 데스크톱 메뉴 아이템 (세로 사이드바, 배경색 강조)
export const AdminSidebarMenuItemDesktop: React.FC<AdminSidebarMenuItemProps> = ({
  href,
  iconSrc,
  label,
  active = false,
  className,
}) => (
  <Link
    href={href}
    className={clsx(
      'flex justify-start items-center gap-8',
      'w-180 h-50 px-12 rounded-md',
      'transition-colors select-none',
      active ? 'bg-gray-50 text-gray-900' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900',
      className
    )}
  >
    <div className="w-25 h-25 flex items-center justify-center">
      <img src={iconSrc} alt="" className="w-20 h-20" aria-hidden="true" />
    </div>
    <span className="text-16 font-medium">{label}</span>
  </Link>
);

export interface AdminSidebarProps {
  companyId: string;
  role?: string;
}

export const AdminSidebar = ({ companyId, role = 'user' }: AdminSidebarProps) => {
  const pathname = usePathname();

  if (role !== 'admin') {
    return null;
  }

  const usersHref = PATHNAME.ADMIN_USERS(companyId);
  const budgetHref = PATHNAME.ADMIN_BUDGET(companyId);

  const isUsersPage = pathname ? pathname.includes('/admin/users') : false;
  const isBudgetPage = pathname ? pathname.includes('/admin/budget') : false;

  return (
    <>
      {/* 모바일 (~ 743px) */}
      <aside className="flex flex-row gap-0 border-b border-gray-200 tablet:hidden">
        <AdminSidebarMenuItemMobile
          href={usersHref}
          iconSrc={isUsersPage ? '/icons/user.svg' : '/icons/user-outline.svg'}
          label="회원 관리"
          active={isUsersPage}
        />
        <AdminSidebarMenuItemMobile
          href={budgetHref}
          iconSrc={isBudgetPage ? '/icons/coin.svg' : '/icons/coin-outline.svg'}
          label="예산 관리"
          active={isBudgetPage}
        />
      </aside>

      {/* 태블릿 (744px ~ 1199px) */}
      <aside className="hidden tablet:flex desktop:hidden flex-row gap-0 border-b border-gray-200">
        <AdminSidebarMenuItemTablet
          href={usersHref}
          iconSrc={isUsersPage ? '/icons/user.svg' : '/icons/user-outline.svg'}
          label="회원 관리"
          active={isUsersPage}
        />
        <AdminSidebarMenuItemTablet
          href={budgetHref}
          iconSrc={isBudgetPage ? '/icons/coin.svg' : '/icons/coin-outline.svg'}
          label="예산 관리"
          active={isBudgetPage}
        />
      </aside>

      {/* 데스크톱 (1200px ~) */}
      <aside className="hidden desktop:flex flex-col gap-4">
        <AdminSidebarMenuItemDesktop
          href={usersHref}
          iconSrc={isUsersPage ? '/icons/user.svg' : '/icons/user-outline.svg'}
          label="회원 관리"
          active={isUsersPage}
        />
        <AdminSidebarMenuItemDesktop
          href={budgetHref}
          iconSrc={isBudgetPage ? '/icons/coin.svg' : '/icons/coin-outline.svg'}
          label="예산 관리"
          active={isBudgetPage}
        />
      </aside>
    </>
  );
};
