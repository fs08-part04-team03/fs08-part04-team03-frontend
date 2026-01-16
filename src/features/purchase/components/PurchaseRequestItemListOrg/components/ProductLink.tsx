'use client';

import React from 'react';
import { clsx } from '@/utils/clsx';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import { PURCHASE_ITEM_LIST_STYLES } from '@/features/purchase/constants';
import { useProductNavigationDirect } from '@/features/products/hooks/useProductNavigationDirect';

interface ProductLinkProps {
  item: PurchaseRequestItem;
  children: React.ReactNode;
  className?: string;
}

/**
 * 상품 링크 컴포넌트
 * Props Depth 1단계 - hook에서 직접 네비게이션 처리
 */
export const ProductLink = ({ item, children, className }: ProductLinkProps) => {
  const productId = item.purchaseItems[0]?.products.id;
  const { goToProductDetail } = useProductNavigationDirect();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (productId != null) {
      goToProductDetail(productId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && productId != null) {
      e.preventDefault();
      e.stopPropagation();
      goToProductDetail(productId);
    }
  };

  if (productId == null) {
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
