'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { clsx } from '@/utils/clsx';
import DropDown, { Option } from '@/components/atoms/DropDown/DropDown';
import Button from '@/components/atoms/Button/Button';
import InputField from '@/components/molecules/InputField/InputField';

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;

  initialName: string;
  initialPrice: string;
  initialLink: string;
  initialImage: string | null;
  initialCategory: Option | null;
  initialSubCategory: Option | null;
}

const categories: Option[] = [
  { key: '1', label: '스낵' },
  { key: '2', label: '음료' },
  { key: '3', label: '생수' },
  { key: '4', label: '간편식' },
  { key: '5', label: '신선식' },
  { key: '6', label: '원두커피' },
  { key: '7', label: '비품' },
];

const subCategories: Option[] = [
  { key: 'drink-soda', label: '탄산음료' },
  { key: 'drink-fruit', label: '과즙음료' },
  { key: 'drink-energy', label: '에너지음료' },
  { key: 'drink-ion', label: '이온음료' },
  { key: 'drink-health', label: '건강음료' },
  { key: 'drink-tea', label: '차류' },
  { key: 'water-water', label: '생수' },
  { key: 'water-sparkling', label: '스파클링' },
  { key: 'simple-cup-ramen', label: '컵라면' },
  { key: 'simple-sausage', label: '소시지' },
  { key: 'simple-egg', label: '계란' },
  { key: 'simple-cup-rice', label: '컵밥류' },
  { key: 'simple-cereal', label: '시리얼' },
  { key: 'fresh-fruit', label: '과일' },
  { key: 'fresh-salad', label: '샐러드' },
  { key: 'fresh-bread', label: '빵' },
  { key: 'fresh-sandwich', label: '샌드위치' },
  { key: 'fresh-yogurt', label: '요거트류' },
  { key: 'fresh-dairy', label: '유제품' },
  { key: 'coffee-drip', label: '드립커피' },
  { key: 'coffee-beans', label: '원두' },
  { key: 'coffee-capsule', label: '캡슐커피' },
  { key: 'supplies-disposable', label: '일회용품' },
  { key: 'supplies-office', label: '사무용품' },
  { key: 'supplies-cleaning', label: '청소용품' },
  { key: 'supplies-hygiene', label: '위생용품' },
];

const ProductModal = ({
  open,
  onClose,
  onSubmit,
  initialName,
  initialPrice,
  initialLink,
  initialImage,
  initialCategory,
  initialSubCategory,
}: ProductModalProps) => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [link, setLink] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Option | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<Option | null>(null);
  const previewUrlRef = useRef<string | null>(null);

  const [errors, setErrors] = useState({
    name: '',
    price: '',
    link: '',
    category: '',
    subCategory: '',
    image: '',
  });

  const formatPrice = (value: string) => {
    const numeric = value.replace(/[^0-9]/g, '');
    return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // 초기값 세팅
  useEffect(() => {
    if (open) {
      setProductName(initialName);
      setPrice(formatPrice(initialPrice));
      setLink(initialLink);
      setPreview(initialImage);
      setSelectedCategory(initialCategory);
      setSelectedSubCategory(initialSubCategory);
      setErrors({ name: '', price: '', link: '', category: '', subCategory: '', image: '' });
    }
  }, [
    open,
    initialName,
    initialPrice,
    initialLink,
    initialImage,
    initialCategory,
    initialSubCategory,
  ]);

  // validation
  const validate = useCallback(() => {
    const newErrors = { name: '', price: '', link: '', category: '', subCategory: '', image: '' };

    if (!productName.trim()) newErrors.name = '상품명을 입력해주세요.';
    if (!price.trim()) newErrors.price = '가격을 입력해주세요.';

    const urlRegex = /^https?:\/\/.+/;
    if (!link.trim()) newErrors.link = '제품 링크를 입력해주세요.';
    else if (!urlRegex.test(link))
      newErrors.link = 'http:// 또는 https://로 시작하는 URL을 입력해주세요.';

    if (!selectedCategory) newErrors.category = '대분류를 선택해주세요.';
    if (!selectedSubCategory) newErrors.subCategory = '소분류를 선택해주세요.';
    if (!preview) newErrors.image = '상품 이미지를 등록해주세요.';

    setErrors(newErrors);
    return !Object.values(newErrors).some((msg) => msg !== '');
  }, [productName, price, link, selectedCategory, selectedSubCategory, preview]);

  // ESC 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => open && e.key === 'Escape' && onClose();
    if (open) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  useEffect(() => {
    if (open) validate();
  }, [open, validate]);

  /**
   * 🔴 여기만 수정
   * 모달이 닫힐 때 blob URL 정리
   */
  useEffect(() => {
    if (!open && previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit();
  };

  const isValid =
    productName.trim() &&
    price.trim() &&
    link.trim() &&
    preview &&
    selectedCategory &&
    selectedSubCategory &&
    Object.values(errors).every((msg) => msg === '');

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center">
      <button
        type="button"
        aria-label="모달 닫기 영역"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

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
        <div className="flex flex-col items-center gap-2">
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
                if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
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
          {errors.image && <span className="text-red-500 text-12">{errors.image}</span>}
        </div>

        {/* Form */}
        <form className="w-full flex flex-col flex-1 gap-30" onSubmit={handleSubmit}>
          {/* 드롭다운 */}
          <div className="flex flex-col gap-2 mb-6 tablet:mb-8 desktop:mb-8">
            <div className="flex gap-20">
              <DropDown
                items={categories}
                placeholder="대분류"
                variant="medium"
                buttonClassName={clsx(!selectedCategory && 'border-red-500')}
                onSelect={setSelectedCategory}
                selected={selectedCategory || undefined}
              />
              <DropDown
                items={subCategories}
                placeholder="소분류"
                variant="medium"
                buttonClassName={clsx(!selectedSubCategory && 'border-red-500')}
                onSelect={setSelectedSubCategory}
                selected={selectedSubCategory || undefined}
              />
            </div>
            {errors.category && <span className="text-red-500 text-12">{errors.category}</span>}
            {errors.subCategory && (
              <span className="text-red-500 text-12">{errors.subCategory}</span>
            )}
          </div>

          {/* 상품명 */}
          <div className="w-full flex flex-col gap-1">
            <InputField
              label="상품명"
              placeholder="상품명을 입력해주세요"
              value={productName}
              onChange={setProductName}
              minLength={1}
              maxLength={20}
            />
            {errors.name && <span className="text-red-500 text-12">{errors.name}</span>}
          </div>

          {/* 가격 */}
          <div className="w-full flex flex-col gap-1">
            <InputField
              label="가격"
              placeholder="가격을 입력해주세요"
              value={price}
              onChange={(v) => setPrice(formatPrice(v))}
              type="text"
              minLength={1}
              maxLength={20}
            />
            {errors.price && <span className="text-red-500 text-12">{errors.price}</span>}
          </div>

          {/* 제품 링크 */}
          <div className="w-full flex flex-col gap-1">
            <InputField
              label="제품 링크"
              placeholder="제품 링크를 입력해주세요"
              value={link}
              onChange={setLink}
              type="text"
              maxLength={50}
            />
            {errors.link && <span className="text-red-500 text-12">{errors.link}</span>}
          </div>

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
