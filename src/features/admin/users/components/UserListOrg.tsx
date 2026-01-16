import { useState } from 'react';
import Image from 'next/image';
import { Avatar } from '@/components/atoms/Avatar/Avatar';
import RoleBadge, { RoleBadgeRole } from '@/components/atoms/RoleBadge/RoleBadge';
import Button from '@/components/atoms/Button/Button';

import { User } from '@/features/admin/users/api/adminUser.api';

interface UserListProps {
  users: User[];
  onRoleChange: (userId: string) => void;
  onDelete: (userId: string) => void;
}

const UserList = ({ users, onRoleChange, onDelete }: UserListProps) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const toggleMenu = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const getRoleLabel = (role: string) => {
    if (role === 'MANAGER' || role === 'ADMIN') {
      return '관리자';
    }
    return '일반';
  };

  // 권한 설정 (일반/관리자로 표시)
  const getBadgeRole = (role: string): RoleBadgeRole => {
    if (role === 'MANAGER' || role === 'ADMIN') {
      return 'manager';
    }
    return 'user';
  };

  // 사용자 목록이 없을 때
  if (users.length === 0) {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-center min-h-400">
        <div className="flex flex-col items-center gap-24">
          <div className="w-36 h-43 relative opacity-50">
            <Image src="/icons/book.svg" alt="empty" fill className="object-contain" unoptimized />
          </div>
          <div className="flex flex-col items-center gap-8">
            <span className="text-18 font-bold text-gray-900">아직 회원이 없어요</span>
            <span className="text-14 font-medium text-gray-500 text-center whitespace-pre-wrap">
              함께 이용할 회원을 초대하고{'\n'}간식 구매를 통합 관리하세요
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Desktop/tablet용 헤더 */}
      <div className="hidden tablet:flex items-center w-full px-20 border-b border-gray-100 py-20 gap-20 desktop:gap-32">
        <div className="w-150 shrink-0 text-16 font-bold text-gray-500">이름</div>
        <div className="flex-1 text-16 font-bold text-gray-500">메일</div>
        <div className="w-72 text-center text-16 font-bold text-gray-500">권한</div>
        <div className="w-200 text-center text-16 font-bold text-gray-500">비고</div>
      </div>

      {/* 리스트 아이템 */}
      <div className="flex flex-col items-center tablet:items-stretch">
        {users.map((user) => (
          <div key={user.id} className="contents">
            {/* Mobile View */}
            <div className="flex tablet:hidden w-full max-w-327 py-16 gap-12 border-b border-gray-100 relative">
              {/* Avatar */}
              <div className="flex justify-center items-center w-48 h-48 shrink-0 rounded-100 bg-gray-50">
                <Avatar size={32} alt={user.name} src={user.avatarUrl} />
              </div>

              {/* 이름/메일 */}
              <div className="flex flex-col justify-center gap-2">
                <div className="flex items-center gap-8">
                  <span className="text-gray-950 text-16 font-bold tracking-tight">
                    {user.name}
                  </span>
                  <RoleBadge role={getBadgeRole(user.role)}>{getRoleLabel(user.role)}</RoleBadge>
                </div>
                <span className="w-172 text-gray-950 text-16 font-normal tracking-tight truncate">
                  {user.email}
                </span>
              </div>

              {/* Kebab Menu */}
              <div className="ml-auto relative">
                <button type="button" onClick={() => toggleMenu(user.id)} className="p-4">
                  <Image
                    src="/icons/kebab-vertical.svg"
                    alt="more"
                    width={24}
                    height={24}
                    unoptimized
                  />
                </button>

                {openMenuId === user.id && (
                  <div className="absolute right-0 top-full mt-0 bg-white border border-gray-100 rounded-md shadow-lg z-dropdown w-fit whitespace-nowrap">
                    <button
                      type="button"
                      disabled={user.role === 'ADMIN'}
                      className={`w-full px-16 py-12 text-left text-16 font-normal tracking-tight 
                        ${
                          user.role === 'ADMIN'
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-950 hover:bg-gray-50'
                        }`}
                      onClick={() => {
                        onRoleChange(user.id);
                        setOpenMenuId(null);
                      }}
                    >
                      권한 변경
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop/Tablet View */}
            <div className="hidden tablet:flex items-center w-full h-100 px-20 border-b border-[#E6E6E6] bg-white gap-20 desktop:gap-32">
              {/* 이름/아바타 */}
              <div className="flex items-center gap-12 w-150 shrink-0">
                <Avatar size={32} alt={user.name} src={user.avatarUrl} />
                <span className="font-normal text-gray-950 text-16 truncate">{user.name}</span>
              </div>

              {/* 메일 */}
              <div className="flex-1 min-w-0 text-gray-950 text-16 font-normal truncate">
                {user.email}
              </div>

              {/* 권한 */}
              <div className="w-72 shrink-0 flex justify-center">
                <RoleBadge role={getBadgeRole(user.role)}>{getRoleLabel(user.role)}</RoleBadge>
              </div>

              {/* 비고 */}
              <div className="w-200 shrink-0 flex justify-center gap-8">
                <Button
                  variant="secondary"
                  inactive={user.role === 'ADMIN'}
                  className="!px-12 !py-8 !text-16 !font-normal !text-gray-900 !bg-white !border !border-gray-300 !rounded-default hover:!bg-gray-50 transition-colors whitespace-nowrap !h-auto"
                  onClick={() => onRoleChange(user.id)}
                >
                  권한 변경
                </Button>
                <Button
                  variant="primary"
                  className="!px-12 !py-8 !text-16 !font-normal !text-white !bg-red !rounded-default hover:!opacity-90 transition-opacity whitespace-nowrap !h-auto"
                  onClick={() => onDelete(user.id)}
                >
                  계정 탈퇴
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
