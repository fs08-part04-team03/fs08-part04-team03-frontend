import { useParams } from 'next/navigation';
import { AdminSidebar } from '@/components/molecules/AdminSideBar/AdminSideBar';
import Button from '@/components/atoms/Button/Button';
import SearchBar from '@/components/molecules/SearchBar/SearchBar';
import UserList from '@/features/admin/users/components/UserListOrg';
import { User } from '@/features/admin/users/api/adminUser.api';
import PaginationBlock from '@/components/molecules/PaginationBlock/PaginationBlock';

interface AdminUsersTemplateProps {
  users: User[];
  searchQuery: string;
  currentPage: number;
  totalPage: number;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onRoleChange: (userId: string) => void;
  onDelete: (userId: string) => void;
  onInvite: () => void;
}

const AdminUsersTemplate = ({
  users,
  searchQuery,
  currentPage,
  totalPage,
  onSearchChange,
  onPageChange,
  onRoleChange,
  onDelete,
  onInvite,
}: AdminUsersTemplateProps) => {
  const params = useParams();
  const companyId = params.companyId as string;

  return (
    <div className="flex flex-col desktop:flex-row w-full min-h-screen bg-white">
      {/* 어드민 sidebar */}
      <div className="shrink-0">
        <div className="desktop:p-24 desktop:w-260 desktop:sticky desktop:top-0 h-full">
          <AdminSidebar companyId={companyId} userRole="admin" />
        </div>
      </div>

      {/* 메인 컨텐츠 영역 */}
      <main className="flex-1 pt-24 desktop:p-40 overflow-x-hidden">
        <div className="max-w-758 w-full">
          <div className="flex flex-col w-full bg-white">
            {/* 헤더 */}
            <div className="flex justify-between items-center mb-24 desktop:mb-55">
              <h1 className="flex-1 text-black text-18 font-bold tracking-0.45 tablet:text-24 tablet:tracking-0.6 tablet:flex-none">
                회원 관리
              </h1>
              {/* Desktop/Tablet 초대 버튼 */}
              <div className="hidden tablet:block">
                <Button
                  variant="primary"
                  className="!w-150 !h-44 !py-12 !px-16 !rounded-default !bg-gray-950 !text-white !text-16 !font-bold tracking-tight cursor-pointer"
                  onClick={onInvite}
                >
                  회원 초대하기
                </Button>
              </div>
            </div>

            {/* 검색 */}
            <div className="mb-24 desktop:mb-40">
              <SearchBar
                placeholder="이름으로 검색하세요"
                defaultValue={searchQuery}
                onSearch={onSearchChange}
                className="w-full"
                instant
              />
            </div>

            {/* 테이블 */}
            <div className="mb-40">
              <UserList users={users} onRoleChange={onRoleChange} onDelete={onDelete} />
            </div>

            {/* 페이징 */}
            {users?.length > 0 && (
              <div className="w-full mt-40 mb-100 tablet:mb-0 [&>div]:!w-full">
                <PaginationBlock
                  current={currentPage}
                  total={totalPage}
                  onPrev={(page) => onPageChange(page)}
                  onNext={(page) => onPageChange(page)}
                />
              </div>
            )}

            {/* Mobile 초대 버튼 (Bottom) */}
            <div className="fixed bottom-0 left-0 w-full p-24 bg-white border-t border-gray-100 tablet:hidden z-[var(--z-base)] flex justify-center">
              <Button
                variant="primary"
                className="!w-327 !h-44 !py-12 !px-16 !rounded-default !bg-gray-950 !text-white !text-16 !font-bold tracking-tight"
                onClick={onInvite}
              >
                회원 초대하기
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminUsersTemplate;
