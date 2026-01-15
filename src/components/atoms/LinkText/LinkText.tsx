'use client';

import React, { useState, useCallback } from 'react';
import { clsx } from '@/utils/clsx';
import CustomModal from '@/components/molecules/CustomModal/CustomModal';

export interface LinkTextProps {
  /** 표시할 URL */
  url: string;
  /** 텍스트 크기 클래스 */
  className?: string;
  /** 클릭 가능 여부 (기본값: true) */
  clickable?: boolean;
}

/**
 * URL을 도메인까지만 표시하고 클릭 시 모달을 띄워 확인 후 이동하는 컴포넌트
 * 예: https://www.codeit.com/products → www.codeit.com
 */
export const LinkText = ({ url, className, clickable = true }: LinkTextProps) => {
  const [linkModalOpen, setLinkModalOpen] = useState(false);

  // URL을 .com/까지 표시하는 함수 (https:// 제거)
  const formatLinkDisplay = useCallback((linkUrl: string): string => {
    if (!linkUrl) return '';
    try {
      // URL이 http:// 또는 https://로 시작하지 않으면 추가
      let fullUrl = linkUrl;
      if (!linkUrl.startsWith('http://') && !linkUrl.startsWith('https://')) {
        fullUrl = `https://${linkUrl}`;
      }

      const { hostname } = new URL(fullUrl);

      // 호스트네임만 반환 (예: www.codeit.com)
      return `${hostname}`;
    } catch {
      // URL 파싱 실패 시 원본 반환
      return linkUrl;
    }
  }, []);

  const handleLinkClick = useCallback(
    (e: React.MouseEvent) => {
      if (!clickable) return;
      e.stopPropagation();
      if (url) {
        setLinkModalOpen(true);
      }
    },
    [url, clickable]
  );

  const handleLinkModalConfirm = useCallback(() => {
    if (url) {
      let linkUrl = url;
      // URL이 http:// 또는 https://로 시작하지 않으면 추가
      if (!linkUrl.startsWith('http://') && !linkUrl.startsWith('https://')) {
        linkUrl = `https://${linkUrl}`;
      }
      window.open(linkUrl, '_blank', 'noopener,noreferrer');
    }
    setLinkModalOpen(false);
  }, [url]);

  const handleLinkModalClose = useCallback(() => {
    setLinkModalOpen(false);
  }, []);

  const displayText = formatLinkDisplay(url);

  if (!clickable) {
    return <span className={className}>{displayText}</span>;
  }

  return (
    <>
      <span
        className={clsx(className, 'cursor-pointer hover:underline')}
        onClick={handleLinkClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleLinkClick(e as unknown as React.MouseEvent);
          }
        }}
      >
        {displayText}
      </span>

      {/* 링크 확인 모달 */}
      <CustomModal
        open={linkModalOpen}
        type="link-confirm"
        description={`외부 링크로 이동하시겠습니까?\n${displayText}`}
        onClose={handleLinkModalClose}
        onConfirm={handleLinkModalConfirm}
      />
    </>
  );
};

export default LinkText;
