'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { clsx } from '@/utils/clsx';
import DropDown, { Option } from '@/components/atoms/DropDown/DropDown';
import Button from '@/components/atoms/Button/Button';
import InputField from '@/components/molecules/InputField/InputField';
import { useToast } from '@/hooks/useToast';
import { useQueryClient } from '@tanstack/react-query';
import { CATEGORY_SECTIONS } from '@/constants';
import { useAuthStore } from '@/lib/store/authStore';

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

  const queryClient = useQueryClient();
  const { triggerToast } = useToast();
  const { accessToken } = useAuthStore();

  const formatPrice = (value: string) => {
    const numeric = value.replace(/[^0-9]/g, '');
    return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

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
    if (!price.trim()) newErrors.price = '가격을 입력해주세요.';

    const urlRegex = /^https?:\/\/.+/;
    if (!link.trim()) newErrors.link = '제품 링크를 입력해주세요.';
    else if (!urlRegex.test(link))
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

    // 이미지가 있을 때만 필드 추가 (파일명만 전송)
    if (selectedFile) {
      body.image = selectedFile.name;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        credentials: 'include',
        body: JSON.stringify(body),
      });

      const text = await res.text();
      let result: ApiResponse;

      try {
        result = JSON.parse(text) as ApiResponse;
      } catch {
        result = { success: false, message: text };
      }

      if (!res.ok || !result.success) {
        const message = result.error?.message ?? result.message ?? '상품 등록에 실패했습니다.';
        triggerToast('error', message);
        throw new Error(message);
      }

      triggerToast('success', '상품이 등록되었습니다.');
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      onClose();
    } catch (error) {
      console.error(error);
      triggerToast('error', '상품 등록 중 오류가 발생했습니다.');
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

  // 모달이 열릴 때 자동으로 validate하지 않음 (사용자가 입력하거나 submit 시에만 검증)

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
    <div className="fixed inset-0 z-30 flex items-center justify-center">
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
          'relative bg-white rounded-12 z-modal flex flex-col gap-30 items-center',
          'tablet:w-512 tablet:p-30'
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
                if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
                const newUrl = URL.createObjectURL(file);
                previewUrlRef.current = newUrl;
                setPreview(newUrl);
                setSelectedFile(file);
              }}
            />
            {preview ? (
              <Image src={preview} alt="preview" fill className="object-contain" />
            ) : (
              <Image src="/icons/photo-icon.svg" alt="upload" width={30} height={30} />
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
                setPrice(formatPrice(v));
                setTouched((prev) => ({ ...prev, price: true }));
              }}
              type="text"
              minLength={1}
              maxLength={20}
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
              inactive={!isValid || isSubmitting}
              className="mobile:w-153 mobile:h-64 tablet:w-216 tablet:h-64 desktop:w-216 desktop:h-64 text-16 cursor-pointer"
            >
              {isSubmitting ? '등록중...' : '등록하기'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
