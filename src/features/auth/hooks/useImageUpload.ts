'use client';

import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/useToast';
import { IMAGE_CONSTRAINTS, IMAGE_ERROR_MESSAGES } from '@/features/auth/utils/constants';

/**
 * 이미지 업로드 관리 훅
 * - 파일 선택 및 검증
 * - 미리보기 URL 생성/관리
 * - Object URL 정리
 */
export function useImageUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const previewUrlRef = useRef<string | null>(null);
  const { triggerToast } = useToast();

  // 컴포넌트 언마운트 시 Object URL 정리
  useEffect(
    () => () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }
    },
    []
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 크기 검증
    if (file.size > IMAGE_CONSTRAINTS.MAX_SIZE) {
      triggerToast('error', IMAGE_ERROR_MESSAGES.SIZE_EXCEEDED);
      e.target.value = '';
      return;
    }

    // 파일 형식 검증
    if (
      !IMAGE_CONSTRAINTS.ALLOWED_TYPES.includes(
        file.type as (typeof IMAGE_CONSTRAINTS.ALLOWED_TYPES)[number]
      )
    ) {
      triggerToast('error', IMAGE_ERROR_MESSAGES.INVALID_TYPE);
      e.target.value = '';
      return;
    }

    // 파일 저장
    setSelectedFile(file);

    // 로컬 미리보기 (URL.createObjectURL)
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }
    const previewUrl = URL.createObjectURL(file);
    previewUrlRef.current = previewUrl;
    setPreview(previewUrl);
  };

  const handleImageDelete = () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    setPreview(null);
    setSelectedFile(null);
  };

  return {
    selectedFile,
    preview,
    handleImageChange,
    handleImageDelete,
  };
}
