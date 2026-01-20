'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/useToast';
import { IMAGE_CONSTRAINTS, IMAGE_ERROR_MESSAGES } from '@/features/auth/utils/constants';

/**
 * 이미지 업로드 관리 훅
 * - 파일 선택 및 검증
 * - 미리보기 URL 생성/관리
 * - Object URL 정리
 * - file input 리셋 (같은 파일 재선택 가능)
 */
export function useImageUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const previewUrlRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
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

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // file input ref 자동 등록 (삭제 후 재선택 시 리셋 가능하도록)
      if (!fileInputRef.current) {
        fileInputRef.current = e.target;
      }

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
    },
    [triggerToast]
  );

  const handleImageDelete = useCallback(() => {
    // Object URL 정리
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }

    // 상태 초기화
    setPreview(null);
    setSelectedFile(null);

    // file input 리셋 (같은 파일 재선택 가능하도록)
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  return {
    selectedFile,
    preview,
    handleImageChange,
    handleImageDelete,
  };
}
