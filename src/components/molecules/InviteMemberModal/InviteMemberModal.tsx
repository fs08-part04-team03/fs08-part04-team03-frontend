'use client';

import { useEffect, useRef, useState } from 'react';
import { clsx } from '@/utils/clsx';
import InputField from '@/components/molecules/InputField/InputField';
import DropDown, { Option } from '@/components/atoms/DropDown/DropDown';
import Button from '@/components/atoms/Button/Button';

interface InviteMemberModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (role: Option, name: string, email: string) => void;
}

const roleOptions: Option[] = [{ key: 'admin', label: '관리자' }];

const InviteMemberModal = ({ open, onClose, onSubmit }: InviteMemberModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<Option | null>(null);

  // ESC 닫기
  useEffect(() => {
    if (!open) return undefined; // ★ consistent-return 해결

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // 바깥 클릭 닫기
  const handleOutsideClick = () => {
    onClose();
  };

  if (!open) return null;

  // Submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !selectedRole) return;
    onSubmit(selectedRole, name, email);
  };

  const isValid = name.trim() !== '' && email.trim() !== '' && selectedRole !== null;

  return (
    <div
      className={clsx('fixed inset-0 flex items-center justify-center bg-black/60 z-modal')}
      aria-modal="true"
      role="dialog"
    >
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={handleOutsideClick}
        tabIndex={-1}
        className="absolute inset-0 w-full h-full bg-transparent"
      />

      <div
        ref={modalRef}
        className={clsx(
          'bg-white rounded-16 flex flex-col relative z-10',
          // Mobile
          'mobile:w-375 mobile:h-812 mobile:px-24 mobile:py-24',
          // Tablet & Desktop
          'tablet:w-600 tablet:h-470 tablet:px-58 tablet:py-38',
          'desktop:w-600 desktop:h-470 desktop:px-58 desktop:py-38'
        )}
      >
        {/* HEADER */}
        <div
          className={clsx(
            'flex justify-center items-center px-16 py-16 mobile:mb-26',
            'tablet:px-0 tablet:py-0 desktop:px-0 desktop:py-0 tablet:mb-30 desktop:mb-30 h-54'
          )}
        >
          <span className={clsx('text-18 font-bold text-gray-950')}>회원 초대</span>
        </div>

        <form className="flex flex-col justify-between flex-1" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            {/* 이름 */}
            <div className={clsx('mb-18')}>
              <InputField
                label="이름"
                placeholder="이름을 입력해주세요"
                type="text"
                value={name}
                onChange={setName}
              />
            </div>

            {/* 이메일 */}
            <div className={clsx('mb-28')}>
              <InputField
                label="이메일"
                placeholder="이메일을 입력해주세요"
                type="email"
                value={email}
                onChange={setEmail}
              />
            </div>

            {/* 권한 */}
            <div className="flex flex-col relative z-10">
              <span className="mb-2 text-16 font-bold text-gray-950">권한</span>
              <DropDown
                items={roleOptions}
                variant="large"
                onSelect={(item) => setSelectedRole(item)}
                buttonClassName={clsx(!selectedRole ? 'border-red-500' : '')}
              />
            </div>
          </div>

          <div
            className={clsx(
              'flex gap-20 justify-center mt-24 mobile:mb-24 relative z-0',
              'tablet:justify-start desktop:justify-start'
            )}
          >
            <Button
              variant="secondary"
              size="lg"
              className={clsx(
                'mobile:w-153.5 mobile:h-64',
                'tablet:w-230 tablet:h-64',
                'desktop:w-230 desktop:h-64',
                'cursor-pointer'
              )}
              type="button"
              onClick={onClose}
            >
              취소
            </Button>

            <Button
              variant="primary"
              size="lg"
              className={clsx(
                'mobile:w-153.5 mobile:h-64',
                'tablet:w-230 tablet:h-64',
                'desktop:w-230 desktop:h-64',
                'cursor-pointer'
              )}
              type="submit"
              inactive={!isValid}
            >
              초대하기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteMemberModal;
