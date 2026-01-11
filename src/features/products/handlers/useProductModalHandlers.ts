/**
 * Products 도메인 상품 등록 모달 핸들러
 */

import { useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { productKeys } from '@/features/products/queries/product.keys';

/**
 * 상품 등록 모달 관련 핸들러 훅
 */
export function useProductModalHandlers(
  currentPage: number,
  pageSize: number,
  sortKey: string,
  onSuccess?: () => void
) {
  const [modalOpen, setModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleOpenModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const handleModalSubmit = useCallback(() => {
    setModalOpen(false);
    // 캐시 즉시 제거하여 새로 등록된 상품이 즉시 표시되도록 보장
    queryClient.removeQueries({
      queryKey: productKeys.myRegistered(currentPage, pageSize, sortKey),
    });
    onSuccess?.();
  }, [currentPage, pageSize, sortKey, queryClient, onSuccess]);

  return {
    modalOpen,
    handleOpenModal,
    handleCloseModal,
    handleModalSubmit,
  };
}
