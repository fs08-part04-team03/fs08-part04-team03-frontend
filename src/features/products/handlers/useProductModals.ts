/**
 * Products 도메인 모달 상태 관리 핸들러
 */

import { useState, useCallback } from 'react';

/**
 * 상품 관련 모달 상태 관리 훅
 */
export function useProductModals() {
  const [cartAddFailedModalOpen, setCartAddFailedModalOpen] = useState(false);
  const [cartAddSuccessModalOpen, setCartAddSuccessModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productRegisterModalOpen, setProductRegisterModalOpen] = useState(false);

  const handleOpenCartAddFailedModal = useCallback(() => {
    setCartAddFailedModalOpen(true);
  }, []);

  const handleCloseCartAddFailedModal = useCallback(() => {
    setCartAddFailedModalOpen(false);
  }, []);

  const handleOpenCartAddSuccessModal = useCallback(() => {
    setCartAddSuccessModalOpen(true);
  }, []);

  const handleCloseCartAddSuccessModal = useCallback(() => {
    setCartAddSuccessModalOpen(false);
  }, []);

  const handleOpenEditModal = useCallback(() => {
    setEditModalOpen(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setEditModalOpen(false);
  }, []);

  const handleOpenDeleteModal = useCallback(() => {
    setDeleteModalOpen(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setDeleteModalOpen(false);
  }, []);

  const handleOpenProductRegisterModal = useCallback(() => {
    setProductRegisterModalOpen(true);
  }, []);

  const handleCloseProductRegisterModal = useCallback(() => {
    setProductRegisterModalOpen(false);
  }, []);

  return {
    cartAddFailedModalOpen,
    cartAddSuccessModalOpen,
    editModalOpen,
    deleteModalOpen,
    productRegisterModalOpen,
    handleOpenCartAddFailedModal,
    handleCloseCartAddFailedModal,
    handleOpenCartAddSuccessModal,
    handleCloseCartAddSuccessModal,
    handleOpenEditModal,
    handleCloseEditModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleOpenProductRegisterModal,
    handleCloseProductRegisterModal,
  };
}
