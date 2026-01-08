'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { clsx } from '@/utils/clsx';
import DropDown, { Option } from '@/components/atoms/DropDown/DropDown';
import Button from '@/components/atoms/Button/Button';
import InputField from '@/components/molecules/InputField/InputField';
import { CHILD_CATEGORIES, PARENT_CATEGORIES } from '@/constants/categories/categories.constants';
import { formatPrice, isInvalidPrice, isValidUrl, isValidPriceInput } from '@/utils/validation';
import { logger } from '@/utils/logger';
import { uploadProductImage, getImageUrl, deleteImage } from '@/features/products/api/products.api';
import { useToast } from '@/hooks/useToast';

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
  onSubmit: (data: ProductEditFormData, options?: { imageFile: File }) => void | Promise<void>;

  initialName: string;
  initialPrice: string;
  initialLink: string;
  initialImage: string | null;
  initialImageKey?: string | null; // 이미지 키를 직접 전달 (URL 파싱 방지)
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
  initialImageKey,
  initialCategory,
  initialSubCategory,
}: ProductEditModalProps) => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [link, setLink] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Option | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<Option | null>(null);
  const [_selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedImageKey, setUploadedImageKey] = useState<string | null>(null);
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentImageKey, setCurrentImageKey] = useState<string | null>(initialImageKey || null);
  const [touched, setTouched] = useState({
    name: false,
    price: false,
    link: false,
    category: false,
    subCategory: false,
  });

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

  const { triggerToast } = useToast();

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
      setSelectedFile(null);
      setUploadedImageKey(null);
      setUploadedImageFile(null);
      setCurrentImageKey(initialImageKey || null);
      setErrors({ name: '', price: '', link: '', category: '', subCategory: '', image: '' });
      setTouched({
        name: false,
        price: false,
        link: false,
        category: false,
        subCategory: false,
      });
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
    initialImageKey,
    initialCategory,
    initialSubCategory,
  ]);

  const validate = useCallback(() => {
    const newErrors = { name: '', price: '', link: '', category: '', subCategory: '', image: '' };

    if (!productName.trim()) newErrors.name = '상품명을 입력해주세요.';

    // 가격 검증: 콤마를 제거한 숫자값이 0보다 커야 함
    if (isInvalidPrice(price)) {
      newErrors.price = '가격을 입력해주세요.';
    }

    if (!link.trim()) newErrors.link = '제품 링크를 입력해주세요.';
    else if (!isValidUrl(link))
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

  // 입력값 변경 시 실시간 검증 (touched 필드가 있을 때만)
  useEffect(() => {
    if (open) {
      const hasTouched = Object.values(touched).some((t) => t);
      if (hasTouched) {
        validate();
      }
    }
  }, [open, productName, price, link, selectedCategory, selectedSubCategory, touched, validate]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // submit 시 모든 필드를 touched로 표시
    setTouched({
      name: true,
      price: true,
      link: true,
      category: true,
      subCategory: true,
    });
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

    try {
      // 새 이미지가 업로드된 경우 (이미 S3에 업로드되었고 키를 받아옴)
      if (uploadedImageKey && uploadedImageFile) {
        formData.image = uploadedImageKey;
        logger.info('[ProductEditModal] handleSubmit: 새 이미지 키 사용', {
          imageKey: uploadedImageKey,
        });
      } else if (
        preview &&
        preview === initialImage &&
        currentImageKey &&
        !initialImage?.includes('no-image') &&
        !initialImage?.includes('upload.svg')
      ) {
        // 기존 이미지 유지
        formData.image = currentImageKey;
        logger.info('[ProductEditModal] handleSubmit: 기존 이미지 키 유지', {
          imageKey: currentImageKey,
        });
      } else {
        // 이미지가 없는 경우 (이미 X 버튼으로 삭제됨)
        logger.info('[ProductEditModal] handleSubmit: 이미지 없음 (이미 삭제됨)');
      }

      // uploadedImageFile을 options로 전달 (PATCH API에서 사용)
      await onSubmit(formData, uploadedImageFile ? { imageFile: uploadedImageFile } : undefined);

      // 성공 시 모달 닫기
      onClose();
    } catch (error) {
      logger.error('[ProductEditModal] Product edit submission failed', {
        hasError: true,
        errorType: error instanceof Error ? error.constructor.name : 'Unknown',
      });
      throw error;
    }
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

                // 파일 크기 검증 (5MB)
                const MAX_SIZE = 5 * 1024 * 1024; // 5MB
                if (file.size > MAX_SIZE) {
                  triggerToast('error', '이미지 크기는 5MB 이하여야 합니다.');
                  e.target.value = '';
                  return;
                }

                // 파일 형식 검증
                const allowedTypes = [
                  'image/jpeg',
                  'image/jpg',
                  'image/png',
                  'image/gif',
                  'image/webp',
                ];
                if (!allowedTypes.includes(file.type)) {
                  triggerToast('error', '지원되는 형식: JPEG, JPG, PNG, GIF, WEBP');
                  e.target.value = '';
                  return;
                }

                setSelectedFile(file);
                setIsUploading(true);

                // 1. 이미지 업로드
                uploadProductImage(file, 'products')
                  .then(async (imageKey) => {
                    // 2. 업로드 후 GET API로 signed URL 가져오기
                    const { url: signedUrl } = await getImageUrl(imageKey);

                    // 3. signed URL을 미리보기에 사용
                    if (previewUrlRef.current) {
                      URL.revokeObjectURL(previewUrlRef.current);
                    }
                    setPreview(signedUrl);
                    setUploadedImageKey(imageKey);
                    setUploadedImageFile(file); // 파일도 저장 (PATCH API에서 사용)
                    setCurrentImageKey(imageKey);
                  })
                  .catch((error) => {
                    const message =
                      error instanceof Error ? error.message : '이미지 업로드에 실패했습니다.';
                    triggerToast('error', message);
                    setSelectedFile(null);
                    setPreview(null);
                    setUploadedImageKey(null);
                    setUploadedImageFile(null);
                  })
                  .finally(() => {
                    setIsUploading(false);
                  });
              }}
            />
            {preview && !preview.includes('no-image') && !preview.includes('upload.svg') ? (
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
                    (async () => {
                      // 현재 이미지 키 저장 (삭제하기 전에)
                      const imageKeyToDelete = currentImageKey;

                      // 미리보기 및 상태 초기화 (UI 즉시 업데이트)
                      if (previewUrlRef.current) {
                        URL.revokeObjectURL(previewUrlRef.current);
                        previewUrlRef.current = null;
                      }
                      setPreview('/icons/upload.svg');
                      setSelectedFile(null);
                      setUploadedImageKey(null);
                      setUploadedImageFile(null);
                      setCurrentImageKey(null);

                      // 기존 이미지가 있으면 즉시 삭제
                      if (imageKeyToDelete) {
                        try {
                          logger.info('[ProductEditModal] 이미지 삭제 버튼 클릭, 즉시 삭제 시작', {
                            imageKey: imageKeyToDelete,
                          });
                          await deleteImage(imageKeyToDelete);
                          logger.info('[ProductEditModal] 이미지 삭제 성공 (X 버튼 클릭)', {
                            imageKey: imageKeyToDelete,
                          });
                          triggerToast('success', '이미지가 삭제되었습니다.');
                        } catch (deleteError) {
                          logger.error('[ProductEditModal] 이미지 삭제 실패 (X 버튼 클릭)', {
                            hasError: true,
                            errorType:
                              deleteError instanceof Error
                                ? deleteError.constructor.name
                                : 'Unknown',
                            errorMessage:
                              deleteError instanceof Error
                                ? deleteError.message
                                : String(deleteError),
                            imageKey: imageKeyToDelete,
                          });
                          triggerToast('error', '이미지 삭제에 실패했습니다.');
                          // 삭제 실패 시 이전 상태로 복원하지 않음 (사용자가 의도적으로 삭제했으므로)
                        }
                      }
                    })().catch(() => {
                      // 에러는 이미 위에서 처리됨
                    });
                  }}
                  className="absolute top-0 right-0 w-24 h-24 flex items-center justify-center bg-white rounded-full z-50"
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
                src="/icons/upload.svg"
                alt="upload"
                width={140}
                height={140}
                className="object-contain pointer-events-none"
              />
            )}
          </div>
          {errors.image && <span className="text-red-500 text-12">{errors.image}</span>}
        </div>

        <form
          className="w-full flex flex-col flex-1 gap-20"
          onSubmit={(e) => {
            handleSubmit(e).catch((error) => {
              // 에러를 상위로 전파하여 부모 컴포넌트가 처리할 수 있도록 함
              logger.error('ProductEditModal submit error', {
                hasError: true,
                errorType: error instanceof Error ? error.constructor.name : 'Unknown',
              });
            });
          }}
        >
          <div className="flex flex-col gap-2 mb-6 tablet:mb-8 desktop:mb-8">
            <div className="flex gap-20">
              <DropDown
                items={categories}
                placeholder="대분류"
                variant="medium"
                buttonClassName={clsx(touched.category && !selectedCategory && 'border-red-500')}
                onSelect={(v) => {
                  setSelectedCategory(v);
                  setSelectedSubCategory(null);
                  setTouched((prev) => ({ ...prev, category: true }));
                }}
                selected={selectedCategory || undefined}
                inModal
              />
              <DropDown
                items={filteredSubCategories}
                placeholder="소분류"
                variant="medium"
                buttonClassName={clsx(
                  touched.subCategory && !selectedSubCategory && 'border-red-500'
                )}
                onSelect={(option) => {
                  setSelectedSubCategory(option);
                  setTouched((prev) => ({ ...prev, subCategory: true }));
                }}
                selected={selectedSubCategory || undefined}
                inModal
              />
            </div>
            {touched.category && errors.category && (
              <span className="text-red-500 text-12">{errors.category}</span>
            )}
            {touched.subCategory && errors.subCategory && (
              <span className="text-red-500 text-12">{errors.subCategory}</span>
            )}
          </div>

          <div className="flex flex-col w-full gap-1">
            <InputField
              label="상품명"
              placeholder="상품명을 입력해주세요"
              value={productName}
              onChange={(value) => {
                setProductName(value);
                setTouched((prev) => ({ ...prev, name: true }));
              }}
              onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
              minLength={1}
              maxLength={20}
            />
            {touched.name && errors.name && (
              <span className="text-red-500 text-12">{errors.name}</span>
            )}
          </div>

          <div className="flex flex-col w-full gap-1">
            <InputField
              label="가격"
              placeholder="가격을 입력해주세요"
              value={price}
              onChange={(v) => {
                const numeric = v.replace(/[^0-9]/g, '');
                if (isValidPriceInput(numeric)) {
                  setPrice(numeric ? formatPrice(numeric) : '');
                  setTouched((prev) => ({ ...prev, price: true }));
                }
              }}
              onBlur={() => setTouched((prev) => ({ ...prev, price: true }))}
              type="text"
              minLength={1}
              maxLength={20}
            />
            {touched.price && errors.price && (
              <span className="text-red-500 text-12">{errors.price}</span>
            )}
          </div>

          <div className="flex flex-col w-full gap-1">
            <InputField
              label="제품 링크"
              placeholder="제품 링크를 입력해주세요"
              value={link}
              onChange={(value) => {
                setLink(value);
                setTouched((prev) => ({ ...prev, link: true }));
              }}
              onBlur={() => setTouched((prev) => ({ ...prev, link: true }))}
              type="text"
              maxLength={50}
            />
            {touched.link && errors.link && (
              <span className="text-red-500 text-12">{errors.link}</span>
            )}
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
              {isUploading ? '이미지 업로드 중...' : '수정하기'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditModal;
