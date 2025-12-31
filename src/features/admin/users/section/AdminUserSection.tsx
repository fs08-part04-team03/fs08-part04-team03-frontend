'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { User } from '@/features/admin/users/components/UserListOrg';
import AdminUsersTemplate from '@/features/admin/users/template/AdminUserTem';
import InviteMemberModal from '@/components/molecules/InviteMemberModal/InviteMemberModal';
import CustomModal from '@/components/molecules/CustomModal/CustomModal';
import {
  getUsers,
  updateUserRole,
  updateUserStatus,
  inviteUser,
} from '@/features/admin/users/api/adminUser.api';
import { Option } from '@/components/atoms/DropDown/DropDown';

const UserListSection = () => {
  const params = useParams();
  const companyId = params.companyId as string;
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [totalPage, setTotalPage] = useState(1);

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // 사용자 목록 조회
  const fetchUserList = async () => {
    try {
      const response = await getUsers({
        page: currentPage,
        limit: 5,
        query: searchQuery,
      });
      if (response.success) {
        setUsers(response.data || []);
        if (response.pagination) {
          setTotalPage(response.pagination.totalPages);
        }
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  // 사용자 목록 조회 useEffect
  useEffect(() => {
    fetchUserList().catch((err) => console.error('Initial fetch failed', err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchQuery]);

  const handleRoleChange = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;
    setSelectedUser(user);
    setIsInviteModalOpen(true);
  };

  // 사용자 삭제
  const handleDelete = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  // 사용자 삭제 확인
  const handleDeleteConfirm = async () => {
    if (selectedUser) {
      try {
        await updateUserStatus(selectedUser.id, false); // isActive: false
        await fetchUserList();
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  // 사용자 초대
  const handleInvite = () => {
    setSelectedUser(null);
    setIsInviteModalOpen(true);
  };

  // 사용자 초대 submit
  const handleInviteSubmit = async (roleOption: Option, name: string, email: string) => {
    try {
      if (selectedUser) {
        // Role Update
        await updateUserRole(selectedUser.id, roleOption.key.toUpperCase());
      } else {
        // Invite Member
        await inviteUser(companyId, email, name, roleOption.key.toUpperCase());
      }
      await fetchUserList();
    } catch (error) {
      console.error('Operation failed:', error);
    }

    setIsInviteModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <AdminUsersTemplate
        users={users}
        searchQuery={searchQuery}
        currentPage={currentPage}
        totalPage={totalPage}
        onSearchChange={setSearchQuery}
        onPageChange={setCurrentPage}
        onRoleChange={handleRoleChange}
        onDelete={handleDelete}
        onInvite={handleInvite}
      />
      <InviteMemberModal
        open={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onSubmit={(role, name, email) => {
          handleInviteSubmit(role, name, email).catch((err) => {
            console.error(err);
          });
        }}
        defaultValues={
          selectedUser
            ? {
                name: selectedUser.name,
                email: selectedUser.email,
                role: selectedUser.role,
              }
            : undefined
        }
      />
      <CustomModal
        open={isDeleteModalOpen}
        type="user-delete"
        description={
          selectedUser
            ? `${selectedUser.name}(${selectedUser.email})님의 계정을 탈퇴시킬까요?`
            : undefined
        }
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default UserListSection;
