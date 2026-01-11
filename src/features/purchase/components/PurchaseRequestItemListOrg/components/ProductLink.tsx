'use client';

import React from 'react';
import { clsx } from '@/utils/clsx';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import { PURCHASE_ITEM_LIST_STYLES } from '@/features/purchase/constants';

interface ProductLinkProps {
  item: PurchaseRequestItem;
  children: React.ReactNode;
  className?: string;
  onProductClick?: (productId: number) => void;
}

/**
 * 상품 링크 컴포넌트
 * 순수 UI 컴포넌트 - callback prop으로 네비게이션 처리
 */
export const ProductLink = ({ item, children, className, onProductClick }: ProductLinkProps) => {
  const productId = item.purchaseItems[0]?.products.id;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (productId && onProductClick) {
      onProductClick(productId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && productId && onProductClick) {
      e.preventDefault();
      e.stopPropagation();
      onProductClick(productId);
    }
  };

  if (!productId || !onProductClick) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      className={clsx(className, PURCHASE_ITEM_LIST_STYLES.LINK.HOVER)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      {children}
    </div>
  );
};
