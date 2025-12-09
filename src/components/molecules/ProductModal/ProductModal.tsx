'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { clsx } from '@/utils/clsx';
import DropDown, { Option } from '@/components/atoms/DropDown/DropDown';
import Button from '@/components/atoms/Button/Button';
import InputField from '@/components/molecules/InputField/InputField';

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const categories: Option[] = [
  { key: '1', label: '대분류' },
  { key: '2', label: '의류' },
  { key: '3', label: '디지털' },
];

const subCategories: Option[] = [
  { key: '1', label: '소분류' },
  { key: '2', label: '상의' },
  { key: '3', label: '하의' },
];

const ProductModal = ({ open, onClose, onSubmit }: ProductModalProps) => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [link, setLink] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Option | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<Option | null>(null);
  const previewUrlRef = useRef<string | null>(null);

  // 가격 포맷
  const formatPrice = (value: string) => {
    const numeric = value.replace(/[^0-9]/g, '');
    return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // URL validation
  const isValidUrl = (url: string) => {
    const urlRegex = /^(https?:\/\/|www\.)/;
    return urlRegex.test(url);
  };

  // ESC 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  // cleanup blob URL on unmount
  useEffect(
    () => () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    },
    []
  );

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!productName.trim()) return;
    if (!price.trim()) return;
    if (!isValidUrl(link)) return;
    if (!preview || !selectedCategory || !selectedSubCategory) return;

    onSubmit();
  };

  const isValid =
    productName.trim() !== '' &&
    price.trim() !== '' &&
    preview !== null &&
    selectedCategory !== null &&
    selectedSubCategory !== null &&
    isValidUrl(link);

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center">
      {/* Dimmed */}
      <button
        type="button"
        aria-label="모달 닫기 영역"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={clsx(
          'relative bg-white rounded-12 z-modal flex flex-col gap-30 items-center',
          'mobile:pt-2 mobile:pr-24 mobile:pb-24 mobile:pl-24',
          'tablet:w-512 tablet:h-auto tablet:p-30',
          'desktop:w-512 desktop:h-auto desktop:p-30'
        )}
      >
        <h2 id="modal-title" className="text-center text-18 font-bold">
          상품 등록
        </h2>

        {/* 이미지 업로드 */}
        <div
          className={clsx(
            'w-140 h-140 border rounded-8 flex items-center justify-center overflow-hidden cursor-pointer relative',
            preview ? 'border-gray-300' : 'border-red-500'
          )}
        >
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              if (previewUrlRef.current) {
                URL.revokeObjectURL(previewUrlRef.current);
              }
              const newUrl = URL.createObjectURL(file);
              previewUrlRef.current = newUrl;
              setPreview(newUrl);
            }}
          />
          {preview ? (
            <Image
              src={preview}
              alt="preview"
              fill
              className="object-contain pointer-events-none"
            />
          ) : (
            <Image
              src="/icons/photo-icon.svg"
              alt="upload"
              width={30}
              height={30}
              className="opacity-60 pointer-events-none"
            />
          )}
        </div>

        {/* Form */}
        <form className="w-full flex flex-col flex-1 gap-30" onSubmit={handleSubmit}>
          {/* 드롭다운 */}
          <div className="flex gap-20 mb-6 tablet:mb-8 desktop:mb-8">
            <DropDown
              items={categories}
              placeholder="대분류"
              variant="medium"
              buttonClassName={clsx(!selectedCategory && 'border-red-500')}
              onSelect={(item) => setSelectedCategory(item)}
            />
            <DropDown
              items={subCategories}
              placeholder="소분류"
              variant="medium"
              buttonClassName={clsx(!selectedSubCategory && 'border-red-500')}
              onSelect={(item) => setSelectedSubCategory(item)}
            />
          </div>

          {/* 상품명 */}
          <div className="w-full">
            <div className="w-full flex justify-center">
              <InputField
                label="상품명"
                placeholder="상품명을 입력해주세요"
                value={productName}
                onChange={setProductName}
                minLength={1}
                maxLength={20}
              />
            </div>
          </div>

          {/* 가격 */}
          <div className="w-full flex justify-center">
            <InputField
              label="가격"
              placeholder="가격을 입력해주세요"
              value={price}
              onChange={(v) => setPrice(formatPrice(v))}
              type="text"
              minLength={1}
              maxLength={20}
            />
          </div>

          {/* 링크 */}
          <div className="w-full flex justify-center">
            <InputField
              label="제품 링크"
              placeholder="제품 링크를 입력해주세요"
              value={link}
              onChange={setLink}
              type="text"
              maxLength={50}
            />
          </div>

          {/* 버튼 위 자동 여백 */}
          <div className="flex-1" />

          {/* 버튼 */}
          <div className="flex gap-20 justify-center tablet:justify-start desktop:justify-start pb-6">
            <Button
              variant="secondary"
              onClick={onClose}
              className="mobile:w-153 mobile:h-64 tablet:w-216 tablet:h-64 desktop:w-216 desktop:h-64 text-16 cursor-pointer"
            >
              취소
            </Button>

            <Button
              type="submit"
              variant="primary"
              inactive={!isValid}
              className="mobile:w-153 mobile:h-64 tablet:w-216 tablet:h-64 desktop:w-216 desktop:h-64 text-16 cursor-pointer"
            >
              등록하기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
