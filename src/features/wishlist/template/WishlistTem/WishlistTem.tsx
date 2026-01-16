'use client';

import { useEffect, useMemo, useState } from 'react';
import { clsx } from '@/utils/clsx';

import { Divider } from '@/components/atoms/Divider/Divider';
import ProductCard from '@/components/molecules/ProductCard/ProductCard';
import PaginationBlock from '@/components/molecules/PaginationBlock/PaginationBlock';
import StatusNotice from '@/components/molecules/StatusNotice/StatusNotice';

/* =====================
 * Types
 ====================== */
export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  purchaseCount: number;
}

interface WishlistTemProps {
  items: WishlistItem[];
  onRemove?: (id: number) => void;
  onGoToProducts?: () => void;
}

/* =====================
 * Hooks
 ====================== */
const useItemsPerPage = () => {
  const [count, setCount] = useState(6);

  useEffect(() => {
    const update = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        setCount(6); // desktop: 3 * 2
      } else if (window.matchMedia('(min-width: 768px)').matches) {
        setCount(9); // tablet: 3 * 3
      } else {
        setCount(4); // mobile: 2 * 2
      }
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return count;
};

/* =====================
 * Component
 ====================== */
const WishlistTem = ({ items, onRemove, onGoToProducts }: WishlistTemProps) => {
  const [likedItems, setLikedItems] = useState(items);
  const [page, setPage] = useState(1);

  // items가 변경되면 내부 상태 업데이트
  useEffect(() => {
    setLikedItems(items);
  }, [items]);

  const itemsPerPage = useItemsPerPage();
  const totalPage = Math.max(1, Math.ceil(likedItems.length / itemsPerPage));
  const isEmpty = likedItems.length === 0;

  /** 페이지 범위 보정 */
  useEffect(() => {
    if (page > totalPage) {
      setPage(totalPage);
    }
  }, [page, totalPage]);

  /** 현재 페이지 아이템 */
  const currentItems = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return likedItems.slice(start, start + itemsPerPage);
  }, [likedItems, page, itemsPerPage]);

  /** 찜 해제 */
  const handleRemove = (id: number) => {
    if (onRemove) {
      onRemove(id);
    } else {
      setLikedItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <section className={clsx('mx-auto', 'desktop:w-1200 tablet:w-696 w-325')}>
      {/* =====================
          Header
      ====================== */}
      <div
        className={clsx(
          'flex items-center justify-between',
          'desktop:pb-20 desktop:px-0 desktop:pt-0',
          'tablet:px-24 tablet:pt-10 tablet:pb-20',
          'pb-20 mt-40 tablet:mt-0 desktop:mt-80'
        )}
      >
        <div
          className={clsx(
            'text-gray-950 font-bold tracking-tight',
            'text-18 font-700 tracking--0.4'
          )}
        >
          나의 찜 목록
        </div>
      </div>

      <Divider variant="thin" className="desktop:mb-30 mb-20" />

      {/* =====================
          Content
      ====================== */}
      {isEmpty ? (
        /* ===== Empty State ===== */
        <div
          className={clsx(
            'flex items-center justify-center',
            // height 고정
            'desktop:h-950',
            'tablet:h-1045',
            'h-542'
          )}
        >
          <StatusNotice
            title="찜한 상품이 없습니다"
            description={`마음에 드는 상품을 찜해보세요.\n나중에 한 번에 확인할 수 있어요.`}
            buttonText="상품 보러가기"
            onButtonClick={onGoToProducts}
          />
        </div>
      ) : (
        /* ===== Wishlist Grid ===== */
        <div
          className={clsx(
            'grid',
            // columns
            'desktop:grid-cols-3 tablet:grid-cols-3 grid-cols-2',
            // column gap
            'desktop:gap-x-40 tablet:gap-x-20 gap-x-16',
            // row gap
            'desktop:gap-y-30 tablet:gap-y-50 gap-y-40'
          )}
        >
          {currentItems.map((item) => (
            <div key={item.id}>
              <ProductCard
                variant="wishlist"
                name={item.name}
                price={item.price}
                purchaseCount={item.purchaseCount}
                imageUrl={item.imageUrl}
                productId={item.id}
                onUnlike={() => handleRemove(item.id)}
              />
            </div>
          ))}
        </div>
      )}

      {/* =====================
          Pagination (empty여도 유지)
      ====================== */}
      <div className={clsx('flex justify-center', 'desktop:mt-60', 'tablet:mt-40', 'mt-10')}>
        <PaginationBlock
          current={page}
          total={totalPage}
          onPrev={(p) => setPage(p)}
          onNext={(p) => setPage(p)}
        />
      </div>
    </section>
  );
};

export default WishlistTem;
