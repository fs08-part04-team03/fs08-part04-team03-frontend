'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { clsx } from '@/utils/clsx';
import DropDown, { Option } from '@/components/atoms/DropDown/DropDown';
import Button from '@/components/atoms/Button/Button';
import InputField from '@/components/molecules/InputField/InputField';
import { useToast } from '@/hooks/useToast';
import { CATEGORY_SECTIONS } from '@/constants';
import { formatPrice, isInvalidPrice, isValidUrl, isValidPriceInput } from '@/utils/validation';
import { logger } from '@/utils/logger';
import { fetchWithAuth } from '@/utils/api';
import { PRODUCT_API_PATHS } from '@/features/products/constants/api';

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

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: {
    message?: string;
  };
}

const categories: Option[] = CATEGORY_SECTIONS.map((s) => ({
  key: String(s.id),
  label: s.title,
}));

const subCategoriesByCategory: Record<string, Option[]> = CATEGORY_SECTIONS.reduce(
  (acc, section) => ({
    ...acc,
    [String(section.id)]: section.options.map((opt) => ({
      key: String(opt.value),
      label: opt.label,
    })),
  }),
  {}
);

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    price: false,
    link: false,
    category: false,
    subCategory: false,
  });

  const previewUrlRef = useRef<string | null>(null);
  const prevCategoryRef = useRef<Option | null>(null);

  const [errors, setErrors] = useState({
    name: '',
    price: '',
    link: '',
    category: '',
    subCategory: '',
    image: '',
  });

  const filteredSubCategories = selectedCategory
    ? subCategoriesByCategory[selectedCategory.key] || []
    : [];

  const { triggerToast } = useToast();

  const validate = useCallback(() => {
    const newErrors = {
      name: '',
      price: '',
      link: '',
      category: '',
      subCategory: '',
      image: '',
    };

    if (!productName.trim()) newErrors.name = '상품명을 입력해주세요.';

    // 가격 검증: 콤마를 제거한 숫자값이 0보다 커야 함
    if (isInvalidPrice(price)) {
      newErrors.price = '가격을 입력해주세요.';
    }

    if (!link.trim()) newErrors.link = '제품 링크를 입력해주세요.';
    else if (link.trim().length < 1 || link.trim().length > 255)
      newErrors.link = '제품 링크는 1자 이상 255자 이하여야 합니다.';
    else if (!isValidUrl(link))
      newErrors.link = 'http:// 또는 https://로 시작하는 URL을 입력해주세요.';

    if (!selectedCategory) newErrors.category = '대분류를 선택해주세요.';
    if (!selectedSubCategory) newErrors.subCategory = '소분류를 선택해주세요.';
    // 이미지는 선택사항이므로 검증 제거

    setErrors(newErrors);
    return !Object.values(newErrors).some((msg) => msg !== '');
  }, [productName, price, link, selectedCategory, selectedSubCategory]);

  const submitProduct = async (): Promise<void> => {
    if (!validate()) {
      throw new Error('유효성 검사 실패');
    }

    const body: Record<string, unknown> = {
      categoryId: Number(selectedSubCategory?.key ?? selectedCategory?.key ?? 0),
      name: productName.trim(),
      price: Number(price.replace(/,/g, '')),
      link: link.trim(),
    };

    // 이미지 파일이 선택된 경우 FormData로 전송
    let requestBody: string | FormData;
    const headers: HeadersInit = {};

    if (selectedFile) {
      const formData = new FormData();
      formData.append('name', body.name as string);
      formData.append('price', String(body.price));
      formData.append('link', body.link as string);
      formData.append('categoryId', String(body.categoryId));
      formData.append('image', selectedFile);
      requestBody = formData;
      // FormData는 Content-Type을 자동으로 설정하므로 명시하지 않음
    } else {
      requestBody = JSON.stringify(body);
      headers['Content-Type'] = 'application/json';
    }

    setIsSubmitting(true);

    try {
      const res = await fetchWithAuth(PRODUCT_API_PATHS.CREATE_PRODUCT, {
        method: 'POST',
        body: requestBody,
        headers,
      });

      const text = await res.text();
      let result: ApiResponse;

      try {
        result = JSON.parse(text) as ApiResponse;
      } catch {
        result = { success: false, message: text };
      }

      if (!res.ok || !result.success) {
        // 백엔드 에러 메시지 파싱 (validation error 등)
        let errorMessage = '상품 등록에 실패했습니다.';

        if (result.error) {
          // validation error인 경우
          if (typeof result.error === 'object' && result.error !== null) {
            const errorObj = result.error as Record<string, unknown>;
            // 각 필드별 에러 메시지 추출
            const fieldErrors: string[] = [];
            Object.keys(errorObj).forEach((key) => {
              if (key !== 'code' && key !== 'message') {
                const fieldError = errorObj[key];
                if (typeof fieldError === 'object' && fieldError !== null) {
                  const fieldErrorObj = fieldError as { message?: string };
                  if (fieldErrorObj.message) {
                    fieldErrors.push(fieldErrorObj.message);
                  }
                } else if (typeof fieldError === 'string') {
                  fieldErrors.push(fieldError);
                }
              }
            });
            if (fieldErrors.length > 0) {
              errorMessage = fieldErrors.join(', ');
            } else if (errorObj.message && typeof errorObj.message === 'string') {
              errorMessage = errorObj.message;
            }
          } else if (typeof result.error === 'string') {
            errorMessage = result.error;
          }
        } else if (result.message) {
          errorMessage = result.message;
        }

        logger.error('Product registration failed', {
          hasError: true,
          errorType: 'ApiError',
          status: res.status,
          statusText: res.statusText,
          responseText: text,
          requestBody: body,
          parsedErrorMessage: errorMessage,
        });
        triggerToast('error', errorMessage);
        throw new Error(errorMessage);
      }

      triggerToast('success', '상품이 등록되었습니다.');
      onSubmit(); // 부모에서 캐시 처리
      onClose();
    } catch (error) {
      logger.error('Product registration failed', {
        hasError: true,
        errorType: error instanceof Error ? error.constructor.name : 'Unknown',
        errorMessage: error instanceof Error ? error.message : String(error),
        requestBody: body,
      });
      if (!(error instanceof Error && error.message.includes('이미지 업로드'))) {
        const errorMessage =
          error instanceof Error && error.message
            ? error.message
            : '상품 등록 중 오류가 발생했습니다.';
        triggerToast('error', errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (open) {
      setProductName(initialName);
      setPrice(formatPrice(initialPrice));
      setLink(initialLink);
      setPreview(initialImage);
      setSelectedCategory(initialCategory);
      setSelectedSubCategory(initialSubCategory);
      prevCategoryRef.current = initialCategory;
      setSelectedFile(null);
      setErrors({
        name: '',
        price: '',
        link: '',
        category: '',
        subCategory: '',
        image: '',
      });
      setTouched({
        name: false,
        price: false,
        link: false,
        category: false,
        subCategory: false,
      });
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

  useEffect(() => {
    if (
      prevCategoryRef.current &&
      selectedCategory &&
      prevCategoryRef.current.key !== selectedCategory.key
    ) {
      setSelectedSubCategory(null);
    }
    prevCategoryRef.current = selectedCategory;
  }, [selectedCategory]);

  // 입력값 변경 시 실시간 검증 (touched 필드가 있을 때만)
  useEffect(() => {
    if (open) {
      const hasTouched = Object.values(touched).some((t) => t);
      if (hasTouched) {
        validate();
      }
    }
  }, [open, productName, price, link, selectedCategory, selectedSubCategory, touched, validate]);

  useEffect(() => {
    if (!open && previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

    submitProduct()
      .then(() => {
        onSubmit();
      })
      .catch(() => {
        // submitProduct 실패 시 onSubmit 호출하지 않음
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
        aria-label="모달 닫기 영역"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        className={clsx(
          'relative bg-white rounded-12 flex flex-col gap-30 items-center',
          'p-30 tablet:w-512'
        )}
      >
        <h2 className="text-18 font-bold">상품 등록</h2>

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
              className="absolute inset-0 opacity-0 cursor-pointer"
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

                // 로컬 파일을 미리보기용 URL로 변환
                if (previewUrlRef.current) {
                  URL.revokeObjectURL(previewUrlRef.current);
                }
                const previewUrl = URL.createObjectURL(file);
                previewUrlRef.current = previewUrl;
                setPreview(previewUrl);
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
                    if (previewUrlRef.current) {
                      URL.revokeObjectURL(previewUrlRef.current);
                      previewUrlRef.current = null;
                    }
                    setPreview('/icons/upload.svg');
                    setSelectedFile(null);
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
        </div>

        <form className="w-full flex flex-col flex-1 gap-30" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 mb-6 tablet:mb-8 desktop:mb-8">
            <div className="flex gap-20">
              <DropDown
                items={categories}
                placeholder="대분류"
                variant="medium"
                buttonClassName={clsx(touched.category && !selectedCategory && 'border-red-500')}
                onSelect={(option) => {
                  setSelectedCategory(option);
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

          <div className="w-full flex flex-col gap-1">
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

          <div className="w-full flex flex-col gap-1">
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
            />
            {touched.price && errors.price && (
              <span className="text-red-500 text-12">{errors.price}</span>
            )}
          </div>

          <div className="w-full flex flex-col gap-1">
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
              maxLength={255}
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
              inactive={!isValid || isSubmitting}
              className="mobile:w-153 mobile:h-64 tablet:w-216 tablet:h-64 desktop:w-216 desktop:h-64 text-16 cursor-pointer"
            >
              {isSubmitting ? '등록 중...' : '등록하기'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
