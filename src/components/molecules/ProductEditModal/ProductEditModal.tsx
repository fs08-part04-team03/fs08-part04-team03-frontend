'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { clsx } from '@/utils/clsx';
import DropDown, { Option } from '@/components/atoms/DropDown/DropDown';
import Button from '@/components/atoms/Button/Button';
import InputField from '@/components/molecules/InputField/InputField';
import { CHILD_CATEGORIES, PARENT_CATEGORIES } from '@/constants/categories/categories.constants';

export interface ProductEditFormData {
  name: string;
  price: number;
  link: string;
  categoryId: number;
  image?: string;
}

interface ProductEditModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ProductEditFormData) => void | Promise<void>;

  initialName: string;
  initialPrice: string;
  initialLink: string;
  initialImage: string | null;
  initialCategory: Option | null;
  initialSubCategory: Option | null;
}

/**
 * 카테고리 키를 숫자 ID로 변환하는 함수
 * @param key - 카테고리 키 (예: 'snack-cookie', '1')
 * @returns 숫자 ID (소분류 우선, 없으면 대분류 ID, 없으면 0)
 */
const getCategoryIdByKey = (key: string | null | undefined): number => {
  if (!key) return 0;

  // 소분류에서 찾기
  const childCategory = CHILD_CATEGORIES.find((cat) => cat.key === key);
  if (childCategory) return childCategory.id;

  // 대분류에서 찾기
  const parentCategory = PARENT_CATEGORIES.find((cat) => cat.key === key || String(cat.id) === key);
  if (parentCategory) return parentCategory.id;

  return 0;
};

const categories: Option[] = [
  { key: '1', label: '스낵' },
  { key: '2', label: '음료' },
  { key: '3', label: '생수' },
  { key: '4', label: '간편식' },
  { key: '5', label: '신선식' },
  { key: '6', label: '원두커피' },
  { key: '7', label: '비품' },
];

/** ✅ 대분류별 소분류 매핑 (로직만 추가) */
const subCategoriesByCategory: Record<string, Option[]> = {
  '1': [
    { key: 'snack-snack', label: '과자' },
    { key: 'snack-cookie', label: '쿠키' },
    { key: 'snack-biscuit', label: '비스켓류' },
    { key: 'snack-chocolate', label: '초콜릿류' },
    { key: 'snack-candy', label: '캔디류' },
    { key: 'snack-jelly', label: '젤리류' },
    { key: 'snack-cereal-bar', label: '시리얼바' },
    { key: 'snack-nuts', label: '견과류' },
  ],
  '2': [
    { key: 'drink-soda', label: '탄산음료' },
    { key: 'drink-fruit', label: '과즙음료' },
    { key: 'drink-energy', label: '에너지음료' },
    { key: 'drink-ion', label: '이온음료' },
    { key: 'drink-health', label: '건강음료' },
    { key: 'drink-tea', label: '차류' },
  ],
  '3': [
    { key: 'water-water', label: '생수' },
    { key: 'water-sparkling', label: '스파클링' },
  ],
  '4': [
    { key: 'simple-cup-ramen', label: '컵라면' },
    { key: 'simple-sausage', label: '소시지' },
    { key: 'simple-egg', label: '계란' },
    { key: 'simple-cup-rice', label: '컵밥류' },
    { key: 'simple-cereal', label: '시리얼' },
  ],
  '5': [
    { key: 'fresh-fruit', label: '과일' },
    { key: 'fresh-salad', label: '샐러드' },
    { key: 'fresh-bread', label: '빵' },
    { key: 'fresh-sandwich', label: '샌드위치' },
    { key: 'fresh-yogurt', label: '요거트류' },
    { key: 'fresh-dairy', label: '유제품' },
  ],
  '6': [
    { key: 'coffee-drip', label: '드립커피' },
    { key: 'coffee-beans', label: '원두' },
    { key: 'coffee-capsule', label: '캡슐커피' },
  ],
  '7': [
    { key: 'supplies-disposable', label: '일회용품' },
    { key: 'supplies-office', label: '사무용품' },
    { key: 'supplies-cleaning', label: '청소용품' },
    { key: 'supplies-hygiene', label: '위생용품' },
  ],
};

const ProductEditModal = ({
  open,
  onClose,
  onSubmit,
  initialName,
  initialPrice,
  initialLink,
  initialImage,
  initialCategory,
  initialSubCategory,
}: ProductEditModalProps) => {
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

  /** ✅ 선택된 대분류에 따른 소분류 */
  const filteredSubCategories = selectedCategory
    ? subCategoriesByCategory[selectedCategory.key] || []
    : [];

  const formatPrice = (value: string) => {
    const numeric = value.replace(/[^0-9]/g, '');
    return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  useEffect(
    () => () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }
    },
    []
  );

  useEffect(() => {
    if (open) {
      setProductName(initialName);
      setPrice(formatPrice(initialPrice));
      setLink(initialLink);
      setPreview(initialImage);
      setSelectedCategory(initialCategory);
      setSelectedSubCategory(initialSubCategory);
      setErrors({ name: '', price: '', link: '', category: '', subCategory: '', image: '' });
    } else if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
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

    setErrors(newErrors);
    return !Object.values(newErrors).some((msg) => msg !== '');
  }, [productName, price, link, selectedCategory, selectedSubCategory]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => open && e.key === 'Escape' && onClose();
    if (open) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  useEffect(() => {
    if (open) validate();
  }, [open, validate]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    // 카테고리 키를 숫자 ID로 변환
    const categoryId = getCategoryIdByKey(selectedSubCategory?.key ?? selectedCategory?.key);

    if (!categoryId) {
      setErrors((prev) => ({ ...prev, category: '카테고리를 선택해주세요.' }));
      return;
    }

    const formData: ProductEditFormData = {
      name: productName.trim(),
      price: Number(price.replace(/,/g, '')),
      link: link.trim(),
      categoryId,
    };

    // 이미지가 새로 업로드된 경우 (preview가 blob URL인 경우)
    if (preview && preview.startsWith('blob:') && previewUrlRef.current) {
      // 파일명 추출 (실제로는 서버에 업로드 후 파일명을 받아야 함)
      const fileName = `product_${Date.now()}.jpg`;
      formData.image = fileName;
    } else if (
      preview &&
      preview === initialImage &&
      initialImage &&
      !initialImage.includes('no-image')
    ) {
      // 기존 이미지 유지 (URL에서 파일명 추출)
      const urlParts = initialImage.split('/');
      const fileName = urlParts[urlParts.length - 1];
      if (fileName) {
        formData.image = fileName;
      }
    }

    Promise.resolve(onSubmit(formData)).catch((error) => {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('[ProductEditModal] 제출 실패:', error);
      }
      // 에러를 상위로 전파하여 호출자가 처리할 수 있도록 함
      throw error;
    });
  };

  const isValid =
    productName.trim() &&
    price.trim() &&
    link.trim() &&
    selectedCategory &&
    selectedSubCategory &&
    Object.values(errors).every((msg) => msg === '');

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center">
      <button
        type="button"
        aria-label="모달 닫기"
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
          상품 수정
        </h2>

        {/* 이미지 업로드 */}
        <div className="flex flex-col items-center gap-2">
          <div
            className={clsx(
              'w-140 h-140 border rounded-8 flex items-center justify-center overflow-hidden cursor-pointer relative',
              'border-gray-300'
            )}
          >
            <input
              type="file"
              accept="image/*"
              aria-label="상품 이미지 업로드"
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
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
              <>
                <Image
                  src={preview}
                  alt="preview"
                  width={140}
                  height={140}
                  className="object-contain pointer-events-none"
                  unoptimized
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (previewUrlRef.current) {
                      URL.revokeObjectURL(previewUrlRef.current);
                      previewUrlRef.current = null;
                    }
                    setPreview(null);
                  }}
                  className="absolute top-0 right-0 w-24 h-24 flex items-center justify-center bg-white rounded-full z-20"
                  aria-label="이미지 삭제"
                >
                  <Image
                    src="/icons/close-circle.svg"
                    alt="삭제"
                    width={24}
                    height={24}
                    className="pointer-events-none"
                  />
                </button>
              </>
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

        <form className="w-full flex flex-col flex-1 gap-20" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 mb-6 tablet:mb-8 desktop:mb-8">
            <div className="flex gap-20">
              <DropDown
                items={categories}
                placeholder="대분류"
                variant="medium"
                buttonClassName={clsx(!selectedCategory && 'border-red-500')}
                onSelect={(v) => {
                  setSelectedCategory(v);
                  setSelectedSubCategory(null);
                }}
                selected={selectedCategory || undefined}
                inModal
              />
              <DropDown
                items={filteredSubCategories}
                placeholder="소분류"
                variant="medium"
                buttonClassName={clsx(!selectedSubCategory && 'border-red-500')}
                onSelect={setSelectedSubCategory}
                selected={selectedSubCategory || undefined}
                inModal
              />
            </div>
            {errors.category && <span className="text-red-500 text-12">{errors.category}</span>}
            {errors.subCategory && (
              <span className="text-red-500 text-12">{errors.subCategory}</span>
            )}
          </div>

          <div className="flex flex-col w-full gap-1">
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

          <div className="flex flex-col w-full gap-1">
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

          <div className="flex flex-col w-full gap-1">
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
              수정하기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditModal;
