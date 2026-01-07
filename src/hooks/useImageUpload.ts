import { useState, useCallback } from 'react';
import { uploadProfileImage, getImageUrl } from '@/features/products/api/products.api';
import { useToast } from './useToast';

interface UseImageUploadReturn {
  preview: string | null;
  uploadedImageKey: string | null;
  isUploading: boolean;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetImage: () => void;
}

/**
 * 이미지 업로드를 위한 커스텀 훅
 *
 * 파일 크기/타입 검증, 업로드, signed URL 조회, 에러 핸들링을 포함합니다.
 *
 * @returns preview, uploadedImageKey, isUploading, handleImageChange, resetImage
 *
 * @example
 * ```tsx
 * const { preview, uploadedImageKey, isUploading, handleImageChange, resetImage } = useImageUpload();
 *
 * <input type="file" onChange={handleImageChange} />
 * {preview && <img src={preview} alt="Preview" />}
 * ```
 */
export const useImageUpload = (): UseImageUploadReturn => {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedImageKey, setUploadedImageKey] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { triggerToast } = useToast();

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // 파일 크기 검증 (5MB)
      // ⚠️ 주의: 클라이언트 측 검증은 우회 가능하므로, 백엔드 서버에서도 반드시 검증해야 합니다.
      // - 파일 크기: 5MB 이하
      // - 허용된 파일 형식: JPEG, JPG, PNG, GIF, WEBP
      // 백엔드 API(/api/v1/upload/image)에서 이러한 검증이 수행되고 있는지 확인해 주세요.
      const MAX_SIZE = 5 * 1024 * 1024; // 5MB
      if (file.size > MAX_SIZE) {
        triggerToast('error', '이미지 크기는 5MB 이하여야 합니다.');
        e.target.value = '';
        return;
      }

      // 파일 형식 검증
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        triggerToast('error', '지원되는 형식: JPEG, JPG, PNG, GIF, WEBP');
        e.target.value = '';
        return;
      }

      setIsUploading(true);

      // 1. 이미지 업로드
      uploadProfileImage(file)
        .then(async (imageKey) => {
          // 2. 업로드 후 GET API로 signed URL 가져오기
          const { url: signedUrl } = await getImageUrl(imageKey);

          // 3. signed URL을 미리보기에 사용
          // 주의: signed URL은 Object URL이 아니므로 URL.revokeObjectURL을 호출하지 않습니다.
          setPreview(signedUrl);
          setUploadedImageKey(imageKey);
        })
        .catch((error) => {
          const message = error instanceof Error ? error.message : '이미지 업로드에 실패했습니다.';
          triggerToast('error', message);
          setPreview(null);
          setUploadedImageKey(null);
        })
        .finally(() => {
          setIsUploading(false);
        });
    },
    [triggerToast]
  );

  const resetImage = useCallback(() => {
    setPreview(null);
    setUploadedImageKey(null);
  }, []);

  return {
    preview,
    uploadedImageKey,
    isUploading,
    handleImageChange,
    resetImage,
  };
};
