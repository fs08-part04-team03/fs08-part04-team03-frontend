/**
 * Products 도메인 상품 수정/삭제 액션 핸들러
 */

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateProduct, useDeleteProduct } from '@/features/products/queries/product.queries';
import { productKeys } from '@/features/products/queries/product.keys';
import { PATHNAME } from '@/constants';
import { PRODUCT_MESSAGES } from '@/features/products/constants/messages';
import { logger } from '@/utils/logger';
import type { ProductEditFormData } from '@/components/molecules/ProductEditModal/ProductEditModal';
import type { UpdateMyProductOptions } from '@/features/products/api/products.api';

/**
 * 상품 수정/삭제 관련 액션 훅
 */
export function useProductEditActions(
  productId: string | number,
  companyId: string,
  onUpdateSuccess?: () => void,
  onDeleteSuccess?: () => void
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [imageRefreshKey, setImageRefreshKey] = useState(0);

  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();

  // 상품 수정 핸들러
  const handleEditSubmit = useCallback(
    (data: ProductEditFormData, options?: { imageFile?: File; removeImage?: boolean }): void => {
      const hasNewImageFile = !!options?.imageFile;
      const hasNoImage = !data.image;

      let updateOptions: UpdateMyProductOptions | undefined;
      if (hasNewImageFile) {
        updateOptions = { imageFile: options.imageFile };
      } else if (hasNoImage) {
        updateOptions = { removeImage: true };
      } else {
        updateOptions = undefined;
      }

      logger.info('[ProductEditActions] handleEditSubmit: 상품 수정 시작', {
        hasImageFile: hasNewImageFile,
        removeImage: hasNoImage,
        imageKey: data.image,
      });

      updateProductMutation.mutate(
        {
          productId,
          data,
          options: updateOptions,
        },
        {
          onSuccess: () => {
            // 이미지 리프레시를 위한 타임스탬프 증가 (캐시 무효화)
            setImageRefreshKey((prev) => prev + 1);
            // 페이지를 강제로 새로고침하여 최신 데이터 반영
            router.refresh();
            onUpdateSuccess?.();
          },
        }
      );
    },
    [productId, updateProductMutation, router, onUpdateSuccess]
  );

  // 상품 삭제 핸들러
  const handleDeleteConfirm = useCallback((): void => {
    deleteProductMutation.mutate(
      { productId, companyId },
      {
        onSuccess: () => {
          // 리다이렉트
          router.push(PATHNAME.PRODUCTS(companyId));
          onDeleteSuccess?.();
        },
      }
    );
  }, [productId, companyId, router, deleteProductMutation, onDeleteSuccess]);

  return {
    handleEditSubmit,
    handleDeleteConfirm,
    imageRefreshKey,
    isLoading: updateProductMutation.isPending || deleteProductMutation.isPending,
  };
}
